import React, { Component } from 'react';
import { connect } from 'react-redux'

class Home extends Component {
  render () {
    return(
      <div>
        <h1>Welcome!</h1>
        <a href="/dashboard">Dashboard</a>
      </div>
    );
  }
}

export default Home;
