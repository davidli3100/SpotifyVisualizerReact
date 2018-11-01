import React, { Component } from 'react';
import './App.css';
import Home from './views/Home';
import P5Wrapper from './views/P5Wrapper';
import sketch from './views/js/sketch';

class App extends Component {


  constructor() {
    super();
    this.state = {
        
    }
  }

  componentDidMount() {
  }

  render() {
    return (
    <div>
      <div className="p5Canvas">
        <P5Wrapper sketch={sketch} />
      </div>
      <div className="main col-sm-12">
        <Home />
        
      </div>
      </div>
    );
  }
}

export default App;
