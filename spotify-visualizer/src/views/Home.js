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
 * SongTitle just passes the properties given to it by the Player main component and displays it
 */
class SongTitle extends Component {

    render () {
        return (
            <div className="song col-sm-12">
                <div className="album-image-div col-sm-3" >
                    <img className="album_img" src={this.props.albumImage} alt="album image"></img>
                </div>
                <div className="title-div col-sm-9">
                    <h1 className="song-title">
                        {this.props.songName}
                    </h1>
                

                    <h3 className="artist">
                        {this.props.artist}
                    </h3>

                    <Line id="progress" percent={this.props.progress} strokeWidth = "1.5" trailWidth="1.5" strokeColor="#FFFFFF" />

                </div>
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
                <a className="start_btn btn-sm btn-success" href="http://localhost:80/login">Connect To Spotify</a>
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

    /**
     * This function takes a Spotify User Access Token (which is generated automatically via the OAuth flow) and then creates an API call to Spotify's Connect API to get the user's playback state
     * @name getUserPlaybackState
     * @param {string} accessToken takes an access token
     * @returns {JSON} returns a JSON object of the user's playback state
     * 
     * uses the <code>fetch</code> function from Node.js that is a replacement for normal HTTP GET requests or other npm packages like Axios
     * fetch allows you to include headers and use async functionalities to process data
     * 
     * <code>.then(response)</code> allows me to wait for the api call to finish asynchronously without writing a full promise
     * after the API call is resolved, then the response is parsed into json, where it is again waited on asynchronously
     * 
     * the data param you see in the second <code>.then()</code> function is then used to <code>this.setState</code>
     * setting the state of this React component is essentially a built in memory strategy similar to Redux or Redis (just not as useful)
     * where the component can call data from
     * 
     * Resetting the state also forces the components to hard refresh which is useful later on when we want the progress bar to change it's progress
     */
    fetchData(accessToken) {
        fetch('https://api.spotify.com/v1/me/player', {
                        headers: {
                            'Authorization': 'Bearer ' + accessToken}
                    }).then(response => response.json()).then(data => {
                            console.log(data);
                            this.setState({
                                song: {                    
                                    song_name: data.item.name,
                                    artist: data.item.artists[0].name,
                                    time: (data.progress_ms*100)/data.item.duration_ms, //convert times in ms to progress in %
                                    duration: data.item.duration_ms,
                                    album_url: data.item.album.images[0].url
                                }             
                        });
                        console.log(this.state);
                        console.log(this.state.song);
                    })
        }


    /**
     * @function
     * @todo this function is yet to be fully implemented due to a lack of time. If I were to bring this app into full alpha testing I would 
     * use Redux and maybe a MongoDB to fully store user data dynamically and refresh access tokens without the user doing anything
     * @name getNewToken
     * @param {string} refreshToken
     * @returns {string} returns a new accesstoken since the one before expires after one hour
     * 
     * again, uses a fetch function to asynchronously get a JSON payload
     * some more complication params within the fetch function this time
     * need to explicitly define a POST method, and set the post mode to <code>cors</code> to abide to cross-origin rules spotify has
     */
    getNewToken(refreshToken) {
        fetch('https://api.spotify.com/api/token', {
            method: "POST",
            mode: "cors",
            body: {
                'grant_type': 'refresh_token',
                'refresh_token': refreshToken
            },
            headers: {
                'Accept': 'application/json',
                "Content-Type": 'application/x-www-form-urlencoded',
                "Authorization": 'Basic ' + btoa(process.env.CLIENT_ID + ':' + process.env.SECRET)
            }
        }).then(response => response.json())
          .then(data => {
              console.log("refresh" + data);
          })
    }
     
    //simple contructor for this component, calling super() before and having a state already there so my get functions can push to it
    constructor() {
        super();
        this.state = {
            serverData: {}
        }
    }
    componentDidMount() {
        /**
         * @name parsedToken
         * @param {string} URI
         * @returns {string} a formmated query string (access token)
         * 
         * takes the returned access token an user gives from the auth flow and returns an access token (completely parsed and encoded)
         */
        let parsed = queryString.parse(window.location.search);
        console.log(parsed);
        let accessToken = parsed.access_token;
        console.log(accessToken);
        // let refreshToken = parsed.refresh_token; - not needed for now
        // console.log(refreshToken);

        // if an accessToken exists (i.e. an user has logged in) then call the fetchData function and set the state to the data returned from it
        if(accessToken) {
            this.fetchData(accessToken);

            //set the component's state to the fetchData's returned value, use a setInterval function to continously refresh the function
            //refreshing the function gives us up to date info about currently playing, progress in the song, and more without having to subscribe to webhooks
            this.state = setInterval(() => this.fetchData(accessToken), 1000);
            } 
               
}


    // now render all of the components we need
    render() {
        return (
            <div className="contain col-sm-12">

                        
            {this.state.song ? //if state.song exists render the div below, else jump to the colon and render that
            <div>
                <SongTitle songName={ this.state.song.song_name }
                           artist={ this.state.song.artist }
                           albumImage={this.state.song.album_url}
                           progress={ this.state.song.time }
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