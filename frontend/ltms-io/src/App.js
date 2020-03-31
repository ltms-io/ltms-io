import React from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LTMSNavbar from "./components/LTMSNavbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AccountDetails from "./components/AccountDetails";
import TournamentSearch from "./components/TournamentSearch"
import CreateTournament from "./components/CreateTournament";
import Sheet from "./components/Scoresheet";
import Callback from "./components/Callback";
import PictureUploadModalTest from "./components/PictureUploadModalTest";
import VolunteerModalTest from "./components/VolunteerModalTest";
import SetReferee from "./components/SetReferee";
import MainDashboard from "./components/MainDashboard";
import TournamentDashboard from "./components/TournamentDashboard";
import RubricEntry from "./components/RubricEntry";
import MatchScoreListing from "./components/MatchScoreListing";
import EditScoreEntry from "./components/EditScoreEntry";
import CreateTeam from './components/CreateTeam';
import ViewRubrics from './components/ViewRubrics';
import CreateJudges from './components/CreateJudges';
import axios from 'axios';
import RoleChange from './components/RoleChange';
import SortTeams from './components/SortTeams';
import CreateTeam from './components/CreateTeam';
import viewRubric from './components/ViewRubrics';
import CreateJudges from './components/CreateJudges';
const jsonWeb = require('jsonwebtoken');

function App(props) {
  if(!document.cookie){
    axios.post('http://localhost:5000/api/users/login', {data: localStorage.getItem("auth0_id")}).then( (result) => {
      document.cookie = "UserIdentity=" + result.data;
      // localStorage.removeItem("auth0_id");
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

           <Route path="/createteam/:tourneyId" component={CreateTeam} />
          <Route path="/viewrubrics/:tourneyId" component={viewRubric} />
          <Route path="/createjudge/:tourneyId" component={CreateJudges} />
          <Route path="/accountdetails" component={() => <AccountDetails auth={props.auth} />} />
          <Route path="/createscoresheet" component={ Sheet }/>
          <Route path="/callback" component={Callback} />
          <Route path="/pictureuploadtest" component={PictureUploadModalTest} />
          <Route path="/volunteermodaltest" component={ VolunteerModalTest } />
          <Route path="/tournamentsearch" component={ TournamentSearch } />
          <Route path="/setreferee/:tourneyId" component={ SetReferee } />
          <Route path="/maindashboard" component={ MainDashboard } />
          <Route path="/tournamentdashboard/:tourneyId" component={ TournamentDashboard } />
          <Route path="/rubricentry/:tourneyId/:teamId" component={ RubricEntry } />
          <Route path="/rolechange" component={ RoleChange }/>
          <Route path="/t/:tourneyId/mscores" component={ MatchScoreListing } />
          <Route path="/t/:tourneyId/editscore/:scoreId" component={ EditScoreEntry } />
          <Route path="/matchranking/:tourneyId" component={ SortTeams } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
