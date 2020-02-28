import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
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
        <div>
          <a href="/createscoresheet">Create A Scoresheet</a>
        </div>
        <div>
            <a href="/volunteermodaltest">Volunteer Assignment Modal Test</a>
        </div>

        <button onClick={this.props.auth.logout}>Logout</button>

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

    console.log("INITIAL HOME STATE", this.state);
  }
}

export default Home;
