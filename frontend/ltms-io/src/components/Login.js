import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Login extends Component {
  render() {
    return (
      <div className="pl-3 pr-3 pt-2">
        <p className="App-intro">Please login using Auth0</p>
        {!this.props.auth.isAuthenticated() && (
          <div>(You are currently not logged in)</div>
        )}
        <div>
          <Button className="mt-2" onClick={this.props.auth.login}>Login / Sign Up</Button>
        </div>
      </div>
    );
  }
}

export default Login;
