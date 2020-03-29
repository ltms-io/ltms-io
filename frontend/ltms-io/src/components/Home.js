import React, { Component } from "react";
//import axios from 'axios';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>

        {this.props.auth.isAuthenticated() && (
          <div>(You are authenticated!)</div>
        )}
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/dashboard">Dashboard</a>
          </div>
        )}
        <div>
          <a href="/login">Login</a>
        </div>
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/createtournament">Create A Tournament</a>
          </div>
        )}
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/createteam">Create A Team</a>
          </div>
        )}
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/viewrubrics">View Rubrics</a>
          </div>
        )}
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/accountdetails">Edit Account Details</a>
          </div>
        )}
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/pictureuploadtest">Picture Upload Test</a>
          </div>
        )}
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/createscoresheet">Create A Scoresheet</a>
          </div>
        )}
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/volunteermodaltest">Volunteer Assignment Modal Test</a>
          </div>
        )}
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/tournamentsearch">Find a Tournament</a>
          </div>
        )}
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/maindashboard">The Real Dashboard</a>
          </div>
        )}
        {this.props.auth.isAuthenticated() && (
          <button onClick={this.props.auth.logout}>Logout</button>
        )}
      </div>
    );
  }
}

export default Home;
