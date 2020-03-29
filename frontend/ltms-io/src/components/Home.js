import React, { Component } from 'react';
import axios from 'axios';
const jsonWeb = require('jsonwebtoken')


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
          <button onClick={this.props.auth.logout}>Logout</button>
        )}


      </div>
    );
  }

  async componentDidMount() {
    // await axios({
    //   method: 'GET',
    //   url: `https://dev-s68c-q-y.auth0.com/userinfo`,
    //   headers: {
    //     'content-type': 'application/json',
    //     'authorization': 'Bearer ' + localStorage.getItem("access_token")
    //   },
    //   json: true
    // })
    // .then( (result) => {
    //   console.log("Auth info: ");
    //   console.log(result);
    //   this.setState({authresults: result.data});
    //   this.setState({uid: this.state.authresults.sub});
    // })
    // .catch( (error) => {
    //   console.log(error);
    // });

    // Use this statement instead once backend Auth0 connection for register
    // is complete (5e54b2a86efec099146c054b is random test uid):
    //await axios.get(`http://localhost:5000/api/users/5e54b2a86efec099146c054b`)
   
    // Using this so that we don't need to access the database every time a 
    // component is mounted
    if(!localStorage.getItem("auth0_id") && document.cookie){
      console.log("HERE!!!");
      var token = document.cookie.substring(13);
      var decoded = jsonWeb.verify(token, "123456");

      this.state.dbresults = decoded;
    }else{
      console.log("AXIOS!!!");
      await axios.post(`http://localhost:5000/api/users/auth`, {data: localStorage.getItem("auth0_id")})
        .then ((result) => {
          this.state.dbresults = result.data;
        })
        .catch( (error) => {
          console.log(error);
        });
    }
    this.setState(this.state);

    console.log("INITIAL HOME STATE", this.state);
  }
}

export default Home;
