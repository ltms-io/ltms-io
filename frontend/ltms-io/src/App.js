import React from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LTMSNavbar from "./components/LTMSNavbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AccountDetails from "./components/AccountDetails";
import TournamentSearch from "./components/TournamentSearch";
import CreateTournament from "./components/CreateTournament";
import Sheet from "./components/Scoresheet";
import Callback from "./components/Callback";
import PictureUploadModalTest from "./components/PictureUploadModalTest";
import VolunteerModalTest from "./components/VolunteerModalTest";
import SetReferee from "./components/SetReferee";
import MainDashboard from "./components/MainDashboard";
import TournamentDashboard from "./components/TournamentDashboard";
import CreateTeam from "./components/CreateTeam";

function App(props) {
  return (
    <Router>
      <div className="App">
        <LTMSNavbar />
        <Switch>
          <Route path="/" exact component={() => <Home auth={props.auth} />} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={() => <Login auth={props.auth} />} />
          <Route path="/createtournament" component={CreateTournament} />
          <Route path="/createteam" component={CreateTeam} />

          <Route
            path="/accountdetails"
            component={() => <AccountDetails auth={props.auth} />}
          />
          <Route path="/createscoresheet" component={Sheet} />
          <Route path="/callback" component={Callback} />
          <Route path="/pictureuploadtest" component={PictureUploadModalTest} />
          <Route path="/volunteermodaltest" component={VolunteerModalTest} />
          <Route path="/tournamentsearch" component={TournamentSearch} />
          <Route path="/setreferee/:tourneyId" component={SetReferee} />
          <Route path="/maindashboard" component={MainDashboard} />
          <Route
            path="/tournamentdashboard/:tourneyId"
            component={TournamentDashboard}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
