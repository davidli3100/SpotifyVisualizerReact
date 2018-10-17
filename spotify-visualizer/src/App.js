import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './views/Home';

class App extends Component {
  render() {
    return (
      <div className="main col-sm-12">
        <Home />
      </div>
    );
  }
}

export default App;
