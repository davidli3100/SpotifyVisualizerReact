/**
 * Creating a home page, that should be fully static (pending state changes to the callback and login uris)
 * Just using another view page to implement within a router in App.js
 */
import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/Home.css'; //import css for this web page

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
                <a className="start_btn btn-sm btn-success" href="#">Connect To Spotify</a>
            </div>
        )
    }
}

export default class Home extends Component {
    state = {

    }

    render() {
        return (
            <div className="contain col-sm-12">
                <Title/>
                <Button/>
            </div>
        )
    }
}