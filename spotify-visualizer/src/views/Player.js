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
        duration: "4000", //this should be in ms, then converted into a time stamp later
        img: "#"
    }
};

/** Brief Explanation about what's happening here
* 1. I use a constructor to set a state for the data I will be accessing later. React requires that I call
* a super inside my constructor before calling "this" onto itself
* 
* 2. componentDidMount() is a function that activates when the components are first rendered, then you set
* the state of the component to the data you want
* 
* 3. within my render, you will see "{this...}" -> renders into text, the && just checks if the data
* exists or is undefined/null, then you render the data into it. (Truthy/falsy within JS)
*/

class SongTitle extends Component {
    constructor() {
        super();
        this.state = {serverData : {}}
    }
    componentDidMount() {
        this.setState({serverData: testData})
    }

    render () {
        return (
            <div className="song-title col-sm-12">
                <h1 id="start-title">
                {this.state.serverData.song &&
                 this.state.serverData.song.name}
                </h1>

                <h3>
                {this.state.serverData.song &&
                 this.state.serverData.song.artist}
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



export default class Home extends Component {

    render() {
        return (
            <div className="contain col-sm-12">
                <Title/>
                <Button/>
            </div>
        )
    }
}