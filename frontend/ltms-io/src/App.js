import React, { Component } from "react";
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
import axios from 'axios';
import RoleChange from './components/RoleChange';
import SortTeams from './components/SortTeams';
import CreateTeam from './components/CreateTeam';
import viewRubric from './components/ViewRubrics';
import CreateJudges from './components/CreateJudges';
import Schedule from './components/Schedule';
import QuickLinks from './components/QuickLinks';

class App extends Component {
  constructor(props) {
    super(props);

    this.initializeCookie();
  }

  async initializeCookie() {
    if (!document.cookie) {
      await axios.post('api/users/login', {data: localStorage.getItem("auth0_id")})
      .then( (result) => {
        document.cookie = "UserIdentity=" + result.data;
        //localStorage.removeItem("auth0_id");
      })
      .catch( (err) => {
        console.log(err);
        console.log("yeah")
      });
    }
  }

  render() {
    return (
      <Router>
        <div data-test="theApp" className="App">
          <LTMSNavbar auth={this.props.auth} />
          <Switch>
            <Route path="/" exact component={() => <Home auth={this.props.auth} />} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={() => <Login auth={this.props.auth} />} />
            <Route path="/createtournament" component={CreateTournament} />
            <Route path="/createteam/:tourneyId" component={CreateTeam} />
            <Route path="/viewrubrics/:tourneyId" component={viewRubric} />
            <Route path="/createjudge/:tourneyId" component={CreateJudges} />
            <Route path="/accountdetails" component={() => <AccountDetails auth={this.props.auth} />} />
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
            <Route path="/quicklinks" component={ QuickLinks } />
            <Route path="/tournamentschedule/:tourneyId" component={ Schedule } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
