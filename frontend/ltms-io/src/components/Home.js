import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  render () {
    return(
      <div>
        <h1>Welcome!</h1>
        <div><a href="/dashboard">Dashboard</a></div>
        <div><a href="/login">Login</a></div>
        <div><a href="/resetlogin">Reset Login</a></div>
        <div><a href="/accountdetails">Edit Account Details</a></div>
      </div>
    );
  }
}

export default Home;
