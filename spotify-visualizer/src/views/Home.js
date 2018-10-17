/**
 * Creating a home page, that should be fully static (pending state changes to the callback and login uris)
 * Just using another view page to implement within a router in App.js
 */
import React, { Component } from 'react';

export default class Home extends Component {
    state = {

    }

    render() {
        return (
            <div>
                <h1> connected! </h1>
            </div>
        )
    }
}