/**
 * Creating a home page, that should be fully static (pending state changes to the callback and login uris)
 * Just using another view page to implement within a router in App.js
 */
import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'; //re-importing bootstrap just in case
import './css/Player.css'; //import css for this web page

//dummy test data
let testData = {
    user: {
        name: "David",
        profile: "#"
    },
    song: {
        name: "Uptown Girl",
        artist: "Billy Joel",
        duration: 4000,
        time: 1000, //this should be in ms, then converted into a time stamp later
        img: "#"
    }
};

/**
 * This function takes a Spotify User Access Token (which is generated automatically via the OAuth flow) and then creates an API call to Spotify's Connect API to get the user's playback state
 * @name getUserPlaybackState
 * @param {string} input an access token
 * @returns {JSON} returns a JSON object of the user's playback state
 */
function getUserPlaybackState(access_token) {
}
/**
 * SongTitle just passes the properties given to it by the Player main component and displays it
 */
class SongTitle extends Component {

    render () {
        return (
            <div className="song-title col-sm-12">
                <h1 id="start-title">
                    {this.props.song.name}
                </h1>

                <h3>
                    {this.props.song.artist}
                </h3>
            </div>
        )
    }
}

/**
 * Progress bar, re-renders this progress bar 
 */
class Progress extends Component {
    render () {
        return (
            <div className="get_started col-sm-12">
                <a className="start_btn btn-sm btn-success" href="#">Connect To Spotify</a>
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
* </ol>
*/
export default class Home extends Component {

    constructor() {
        super();
        this.state = {serverData : {}}
    }
    componentDidMount() {
        setTimeout(() => { //arrow functions for async
        this.setState({serverData: testData});
        }, 2000); //run this 2 secs after components are mounted
    }

    render() {
        return (
            <div className="contain col-sm-12">
                {this.state.serverData.song ? //if serverData.song exists render the div below, else jump to the colon and render that
                <div>
                    <SongTitle songName={this.state.serverData.song &&
                                        this.state.serverData.song.name}
                            artist={this.state.serverData.song &&
                                    this.state.serverData.song.artist}/> 
                    
                    <Progress duration={this.state.serverData.song &&
                                        this.state.serverData.song.duration}
                            time={this.state.serverData.song &&
                                    this.state.serverData.song.time}/>
                </div> : <h1>Loading</h1>
                }
            </div>
        )
    }
}