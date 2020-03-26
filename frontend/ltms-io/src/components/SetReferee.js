import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

class SetReferee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourneyId: this.props.match.params.tourneyId.substring(1),
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

    await axios.get(`http://localhost:5000/api/tournaments/${this.state.tourneyId}`)
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
    var message = "";
    for (var i = 0; i < strings.length; i++) {
      strings[i] = strings[i].trim();
      await axios.post(`http://localhost:5000/api/users/search`, {
        email: strings[i]
      })
      .then( (result) => {
        ids[i] = result.data._id;
        if (this.state.dbtournresults.referees.includes(ids[i])) {
          message += ("User " + strings[i] + " already is a referee.\n");
          ids[i] = "DNE";
        }
      })
      .catch( (error) => {
        message += ("There was an error finding user " + strings[i] + ".\n");
        ids[i] = "DNE";
        console.log(error);
      });
    }
    message += "\n";

    for (var i = 0; i < ids.length; i++) {
      await axios.patch(`http://localhost:5000/api/tournaments/${this.state.tourneyId}`, {
        referee: ids[i]
      })
      .catch( (error) => {
        if (ids[i] !== "DNE") {
          message += ("There was an error adding user ID " + ids[i] + " to the database.\n");
        }
        console.log(error);
      });
    }

    this.updateState();
    console.log("UPDATED STATE", this.state);

    alert(message);
  }

  render() {
    return(
      <div>
        <h1>Set Referee for {this.state.dbtournresults.name}</h1>
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
    await axios.get(`http://localhost:5000/api/tournaments`)
    .then ( (result) => {
        console.log("TOURNAMENTS", result.data);
    }).catch( (error) => {
        console.log(error);
    });
    await this.updateState();
    console.log("INITIAL SET REFEREE STATE", this.state);

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

export default SetReferee;
