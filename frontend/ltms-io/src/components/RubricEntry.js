import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

class RubricEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourneyId: "5e7c53f30c6d5700d3701567",
      teamId: "5e7f18462b37260116171336",
      dbresults: {},
      dbtournresults: {},
      dbteamresults: {},
      authresults: {},
      isHeadReferee: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  async updateState() {
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
    })
    .catch( (error) => {
      console.log(error);
    });

    await axios.post(`http://localhost:5000/api/users/getuser`, {
      auth0id: this.state.authresults.sub
    }).then ( (result) => {
        this.state.dbresults = result.data;
    }).catch( (error) => {
        console.log(error);
    });

    await axios.get(`http://localhost:5000/api/tournaments/${this.state.tourneyId}`)
    .then( (result) => {
        this.state.dbtournresults = result.data;
    }).catch( (error) => {
        console.log(error);
    });

    await axios.get(`http://localhost:5000/api/teams/${this.state.teamId}`)
    .then( (result) => {
        this.state.dbteamresults = result.data;
    }).catch( (error) => {
        console.log(error);
    });

    this.setState(this.state);
  }

  async handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return(
      <div>
        <h1>Rubric Entry for {this.state.dbteamresults.teamName} in {this.state.dbtournresults.name}</h1>
        <div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    await axios.get(`http://localhost:5000/api/users`)
    .then ( (result) => {
        console.log("USERS", result.data);
    })
    .catch( (error) => {
        console.log(error);
    });
    await axios.get(`http://localhost:5000/api/tournaments`)
    .then ( (result) => {
        console.log("TOURNAMENTS", result.data);
    })
    .catch( (error) => {
        console.log(error);
    });
    await axios.get(`http://localhost:5000/api/teams`)
    .then ( (result) => {
        console.log("ALL TEAMS", result.data);
    })
    .catch( (error) => {
        console.log(error);
    });
    await axios.get(`http://localhost:5000/api/teams/tournid/:${this.state.tourneyId}`)
    .then ( (result) => {
        console.log(`ALL TEAMS FROM ${this.state.tourneyId}`, result.data);
    })
    .catch( (error) => {
        console.log(error);
    });

    await this.updateState();
    console.log("INITIAL RUBRIC ENTRY STATE", this.state);

    if (this.state.dbtournresults.headReferee === this.state.dbresults._id ||
        this.state.dbtournresults.director === this.state.dbresults._id) {
      this.state.isHeadReferee = true;
    }
    else {
      this.state.isHeadReferee = false;
    }

    this.setState(this.state);
  }
}

export default RubricEntry;
