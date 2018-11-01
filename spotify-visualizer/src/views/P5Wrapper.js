import React, { Component } from 'react';
import p5 from 'p5';

/**
 * custom P5 wrapper to get better frame performance with limited amounts of RAM on my heroku dyno
 * Simple wrapper for React sourced off of snippets and a pull request on github
 */
export default class P5Wrapper extends Component {
    componentDidMount() {
        this.canvas = new p5(this.props.sketch, this.wrapper)
        if( this.canvas.redrawWithPropsHandler) {
            this.canvas.redrawWithPropsHandler(this.props)
        }
    }

    componentWillReceiveProps(newprops) {
        if(this.props.sketch !== newprops.sketch) {
            this.canvas.remove()
            this.canvas = new p5(newprops.sketch, this.wrapper)
        }
        if (this.canvas.redrawWithPropsHandler) {
            this.canvas.redrawWithPropsHandler(newprops)
        }
    }

    componentWillUnmount() {
        this.canvas.remove()
    }

    render() {
        return <div ref={wrapper => this.wrapper = wrapper}></div>
    }
}