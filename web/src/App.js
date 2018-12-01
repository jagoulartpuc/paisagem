import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
console.log(process.env.NODE_ENV) // dev
console.log(process.env.NODE_ENV === 'dev') // false
console.log(process.env.NODE_ENV.length) // 4 (including a space at the end) 
export default App;
