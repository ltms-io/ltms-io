import React, { Component } from "react";
import "./App.css";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(props) {
  return (
    <Router>
      <div className="App">
        <h1>LTMS.io</h1>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
