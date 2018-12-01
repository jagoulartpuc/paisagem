import React, { Component } from "react";
// import {show_stringify} from 'helpers/json'
import { withRouter } from "react-router-dom";

import "./app.css";

// Internal
import Routing from "configs/routing";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routing />
        {/* {show_stringify(this.props)}  */}
      </div>
    );
  }
}

export default withRouter(App);
