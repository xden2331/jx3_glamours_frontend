import "./App.css";

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Glamours from "./components/pages/Glamours";

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
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>

              <Route path='/glamours'>
                <Glamours />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
