import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

class SetRefereeTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dbresults: {},
      dbtournresults: {},
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

    // CURRENTLY USING A PLACEHOLDER TOURNAMENT FOR TESTING
    // TODO: get the tournament id selected from dashboard and use this id in
    // the get request
    await axios.get(`http://localhost:5000/api/tournaments/5e6eba4ad1a3c152ba7bc99d`)
    .then( (result) => {
        this.state.dbtournresults = result.data;
    }).catch( (error) => {
        console.log(error);
    });

    this.setState(this.state);
  }

  async handleSubmit(e) {
    e.preventDefault();
    alert(e.target.elements.users.value);
    var strings = e.target.elements.users.value.split(",");
    var ids = [];
    for (var i = 0; i < strings.length; i++) {
      strings[i] = strings[i].trim();
      await axios.post(`http://localhost:5000/api/users/search`, {
        email: strings[i]
      })
      .then( (result) => {
        ids[i] = result.data._id;
      })
      .catch( (error) => {
        console.log(error);
      });
    }

    // CURRENTLY USING A PLACEHOLDER TOURNAMENT FOR TESTING
    // TODO: get the tournament id selected from dashboard and use this id in
    // the get request
    await axios.patch(`http://localhost:5000/api/tournaments/5e6eba4ad1a3c152ba7bc99d`, {
      referee: [
        ...this.state.dbtournresults.referees,
        ...ids
      ]
    })
    .catch( (error) => {
      console.log(error);
    });

    this.updateState();
    console.log("UPDATED STATE", this.state);
  }

  render() {
    return(
      <div>
        <h1>Set Referee Test</h1>
        <div>
          <h3>Reset Email Address</h3>
          {this.state.isHeadReferee && (
            <div>You are authenticated to set referee!</div>
          )}
          {!this.state.isHeadReferee && (
            <div>You are not authenticated to set referee!</div>
          )}
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="users">
              <Form.Label>Enter user(s) below</Form.Label>
              <Form.Control type="text" placeholder="Enter user email(s) separated by commas" />
            </Form.Group>
            {this.state.isHeadReferee && (
              <Button variant="outline-primary" type="submit">
                Submit
              </Button>
            )}
            {!this.state.isHeadReferee && (
              <Button variant="outline-primary" type="submit" disabled>
                Submit
              </Button>
            )}
          </Form>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    await axios.get(`http://localhost:5000/api/users`)
    .then ( (result) => {
        console.log("USERS", result.data);
    }).catch( (error) => {
        console.log(error);
    });
    await this.updateState();
    console.log("INITIAL SET REFEREE TEST STATE", this.state);

    if (this.state.dbtournresults.headReferee == this.state.dbresults._id) {
      this.state.isHeadReferee = true;
    }
    else {
      this.state.isHeadReferee = false;
    }
  }
}
export default SetRefereeTest;
