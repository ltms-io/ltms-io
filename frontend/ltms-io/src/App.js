import React from "react";
import LTMSNavbar from "./components/LTMSNavbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AccountDetails from "./components/AccountDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateTournament from "./components/CreateTournament";
import Sheet from "./components/Scoresheet";
import Callback from "./components/Callback";
import { useCookies } from "react-cookie";


import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import PictureUploadModalTest from "./components/PictureUploadModalTest";
import VolunteerModalTest from "./components/VolunteerModalTest";
import axios from 'axios';
const jsonWeb = require('jsonwebtoken')

function App(props) {
  //console.log(props);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  if(props.auth.isAuthenticated()){
    axios.post('http://localhost:5000/api/users/login', {data: {sub: localStorage.getItem("auth0_id")}}).then( (result) => {
      setCookie('UserIdentity', result.data);
      //var token = cookies.UserIdentity;
      // var decoded = jsonWeb.verify(result.data,"123456");
      // console.log(decoded.name);
      // var token = document.cookie.substring(13);
      // console.log(token);
      // var decoded = jsonWeb.verify(token,"123456");
      // console.log(decoded.name);
      //removeCookie("UserIdentity");
      //console.log(cookies.UserIdentity);
      //console.log(response);
    }).catch(function(err){
      console.log(err);
    });
  }

  return (
    <Router>
      <div className="App">
        <LTMSNavbar />
        <Switch>
          <Route path="/" exact component={() => <Home auth={props.auth} />} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={() => <Login auth={props.auth} />} />
          <Route path="/createtournament" component={CreateTournament} />
          <Route path="/accountdetails" component={() => <AccountDetails auth={props.auth} />} />
          <Route path="/createscoresheet" component={ Sheet }/>
          <Route path="/callback" component={Callback} />
          <Route path="/pictureuploadtest" component={PictureUploadModalTest} />
          <Route path="/volunteermodaltest" component={ VolunteerModalTest } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
