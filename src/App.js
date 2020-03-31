import "./App.css";

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Glamours from "./components/pages/Glamours";
import Upload from "./components/pages/Upload";

const Home = function(props) {
  return <div>HOME</div>;
};

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Navbar />

          <div className='container'>
            <div className='main'>
              <Switch>
                <Route exact path='/'>
                  <Home />
                </Route>

                <Route exact path='/glamours'>
                  <Glamours />
                </Route>

                <Route path='/glamours/upload'>
                  <Upload />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
