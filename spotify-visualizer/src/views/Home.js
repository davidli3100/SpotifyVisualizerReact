/**
 * Creating a home page, that should be fully static (pending state changes to the callback and login uris)
 * Just using another view page to implement within a router in App.js
 */
import React, { Component } from 'react';
import './css/Home.css'; //import css for this web page
import queryString from 'query-string'; //import queryString to take params from uri
import { Line } from 'rc-progress'; //progress bar import
require('dotenv').config();

/**
 * This function takes a Spotify User Access Token (which is generated automatically via the OAuth flow) and then creates an API call to Spotify's Connect API to get the user's playback state
 * @name getUserPlaybackState
 * @param {string} input takes an access token
 * @returns {JSON} returns a JSON object of the user's playback state
 */
function getUserPlaybackState(access_token) {
}

/**
 * @name ProgressBar
 * @param {JSON} input takes a JSON fetch api call as a prop
 * @returns {ProgressBar} returns a rendered progress bar component that updates every second
 */
 class ProgressBar extends Component {
    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         progress: 0
    //     }
    // }
    render() {
    return (
        <div className="progress-bar-custom">
        <Line percent={this.props.progress} strokeWidth = "5" strokeColor="#FFFFFF" />
        </div>
     )
    }
}

/**
 * SongTitle just passes the properties given to it by the Player main component and displays it
 */
class SongTitle extends Component {

    render () {
        return (
            <div className="song-title col-sm-12">
                <h1 id="start-title">
                    {this.props.name}
                </h1>

                <h3>
                    {this.props.artist}
                </h3>
            </div>
        )
    }
}

/**
 * this local class "Title" just takes a small button containing div, and the button itself to turn it 
 * into a component usable within my main Home component
 */
class Title extends Component {
    render () {
        return (
            <div className="title col-sm-12">
                <h1 id="start-title"> Spotify Music Visualizer </h1>
                <h4> Connect Your Spotify Account to Continue </h4>
            </div>
        )
    }
}

class Button extends Component {
    render () {
        return (
            <div className="get_started col-sm-12">
                <a className="start_btn btn-sm btn-success" href="http://localhost:8888/login">Connect To Spotify</a>
            </div>
        )
    }
}

/** Brief Explanation about what's happening here
* <ol>
* <li> I use a constructor to set a state for the data I will be accessing later. React requires that I call
* a super inside my constructor before calling "this" onto itself
* </li> <br>
* 
* <li> componentDidMount() is a function that activates when the components are first rendered, then you set
* the state of the component to the data you want
* </li> <br>
*
* <li> Within my render, you will see <code>{this.state.serverData}</code> which renders into text, the && just checks if the data
* exists or is undefined/null, then you render the data into it. (Truthy/falsy within JS)
* </li> <br>
*
* <li>Wrapping my components within objects and then calling a boolean method upon them prevents them from rendering
* if there has not yet been data provided via the API endpoint
* </li> <br>
* 
* <li> Truthy/falsy logic then renders (redirects) user to the <code>login</code> screen if there is no server data available (i.e. they aren't logged in)
* </ol>
*/
export default class Home extends Component {

    constructor() {
        super();
        this.state = {
            serverData: {}
        }
    }
    componentDidMount() {
        /**
         * @name parsedToken
         * @param {string} window.location.search
         * @returns {string} a formmated query string (access token)
         * 
         * takes the returned access token an user gives from the auth flow and returns an access token (completely parsed and encoded)
         */
        let parsed = queryString.parse(window.location.search);
        console.log(parsed);
        let accessToken = parsed.access_token;
        console.log(accessToken);

        /**
         * @name fetchData
         * @param {string} input
         * @returns a JSON array/file of data, the fetch function itself returns a promise, which can be asynchronous
         * 
         * the header includes the <code>access token</code> which was fetched earlier in the <code>queryString.parse</code>
         * after you fetch the data, asynchronously return a promise and make use of the responose within another state
         */

         fetch('https://api.spotify.com/v1/me/player', {
            headers: {'Authorization': 'Bearer ' + accessToken}
          }).then(response => response.json())
           // .then(data => console.log(data)) //this was for debugging - removed for prod
            .then(data => {
                console.log(data);
                this.setState({
                    song: {                    
                        name: data.item.name,
                        artist: data.item.artists[0].name,
                        time: data.progress_ms,
                        duration: data.item.duration_ms
                    }             
            });
            console.log(this.state);
            console.log(this.state.song);
        })
    }


    render() {
        return (
            <div className="contain col-sm-12">
            
            {this.state.song ? //if serverData.song exists render the div below, else jump to the colon and render that
            <div>
                <SongTitle songName={ this.state.song.name }
                           artist={ this.state.song.artist }
                                    /> 
                
                <ProgressBar progress={ this.state.song.time } 
                             duration={ this.state.song.duration }
                                    />
            </div> : //if the user has not authenticated and the server does not have data, redirect to beginning of auth flow
            <div >
                <Title/>
                <Button/>
            </div>
            }
        </div>

        )
    }
}