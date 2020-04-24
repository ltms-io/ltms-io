import React, { Component } from 'react';
import { Button } from "react-bootstrap";

class Home extends Component {
  render() {
    return (

      <div className="pl-3 pr-3 pt-2">
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
          <Button href="/login">Login</Button>
        </div>
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/createtournament">Create A Tournament</a>
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
        </div>)}
        {this.props.auth.isAuthenticated() && (
        <div>
          <a href="/createscoresheet">Create A Scoresheet</a>
        </div>)}
        {this.props.auth.isAuthenticated() && (
        <div>
            <a href="/volunteermodaltest">Volunteer Assignment Modal Test</a>
        </div>)}
        {this.props.auth.isAuthenticated() && (
        <div>
            <a href="/maindashboard">The Real Dashboard</a>
        </div>)}
        {this.props.auth.isAuthenticated() && (
        <div>
            <a href="/rolechange">Change User Role</a>
        </div>)}
        {this.props.auth.isAuthenticated() && (
          <button onClick={this.props.auth.logout}>Logout</button>
        )}


      </div>
    );
  }
}

export default Home;
