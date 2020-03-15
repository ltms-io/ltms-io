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
      authresults: {}
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

    await axios.get(`http://localhost:5000/api/tournaments/5e654dab2050893113969494`)
    .then ( (result) => {
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
    var newUsers = [];
    for (var i = 0; i < strings.length; i++) {
      strings[i] = strings[i].trim();
      newUsers = [
        ...newUsers,
        {
          user: strings[i],
          uRole: "referee"
        }
      ];
    }
    await axios.patch(`http://localhost:5000/api/tournaments/5e654dab2050893113969494`, {
      volunteers: [
        ...this.state.dbtournresults.volunteers,
        ...newUsers
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
          {this.state.dbtournresults != null && (
            <div>You are authenticated to set referee!</div>
          )}
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="users">
              <Form.Label>Enter user(s) below (separated by commas)</Form.Label>
              <Form.Control type="text" placeholder="Enter user(s)" />
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.updateState();
    console.log("INITIAL SET REFEREE TEST STATE", this.state);
  }
}
export default SetRefereeTest;
