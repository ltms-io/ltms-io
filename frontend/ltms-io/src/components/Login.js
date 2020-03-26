import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div>
        <p className="App-intro">Please login using Auth0</p>
        {!this.props.auth.isAuthenticated() && (
          <div>(You are currently not logged in)</div>
        )}
        <div>
          <button onClick={this.props.auth.login}>Login/SignUp</button>
        </div>
      </div>
    );
  }
}

export default Login;
