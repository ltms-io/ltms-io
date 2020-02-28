import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      dbresults: {},
      authresults: {}
    };
  }

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

  async componentDidMount() {
    await axios({
      method: 'GET',
      url: `https://dev-s68c-q-y.auth0.com/userinfo`,
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem("access_token")
      },
      json: true
    })
    .then( (result) => {
      this.state.authresults = result.data;
      this.state.uid = this.state.authresults.sub;
    })
    .catch( (error) => {
      console.log(error);
    });

    // Use this statement instead once backend Auth0 connection for register
    // is complete (5e54b2a86efec099146c054b is random test uid):
    //await axios.get(`http://localhost:5000/api/users/5e54b2a86efec099146c054b`)
    await axios.get(`http://localhost:5000/api/users/${this.state.uid.substring(6)}`)
      .then ( (result) => {
        this.state.dbresults = result.data;
      })
      .catch( (error) => {
        console.log(error);
      });

    this.setState(this.state);

    console.log("INITIAL LOGIN STATE", this.state);
  }
}

export default Login;
