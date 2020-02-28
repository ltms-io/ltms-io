import React from "react";
import LTMSNavbar from "./components/LTMSNavbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AccountDetails from "./components/AccountDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateTournament from "./components/CreateTournament";
import Callback from "./components/Callback";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

function App(props) {
  //console.log(props);
  if(props.auth.isAuthenticated()){
    
  }
  return (
    <Router>
      <div className="App">
        <LTMSNavbar />
        <Switch>
          <Route path="/" exact component={() => <Home auth={props.auth} />} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={() => <Login auth={props.auth} />} />
          <Route path="/createtournament" component={ CreateTournament } />
          <Route path="/accountdetails" component={ AccountDetails } />
          <Route path="/rolechange" component={ RoleChange } />
          <Route path="/callback" component={Callback} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
