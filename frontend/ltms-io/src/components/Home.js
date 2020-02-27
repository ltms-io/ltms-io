import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        {this.props.auth.isAuthenticated() && (
          <div>(You are authenticated!)</div>
        )}
        <div>
          <a href="/dashboard">Dashboard</a>
        </div>
        <div>
          <a href="/login">Login</a>
        </div>
        <div>
          <a href="/createtournament">Create A Tournament</a>
        </div>
        <div>
          <a href="/accountdetails">Edit Account Details</a>
        </div>
        <div>
          <a href="/pictureuploadtest">Picture Upload Test</a>
        </div>
        <button onClick={this.props.auth.logout}>Logout</button>
      </div>
    );
  }
}

export default Home;
