import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import PropTypes from "prop-types";
import jsonWeb from 'jsonwebtoken';

class SetReferee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourneyId: this.props.match.params.tourneyId,
      uid: "",
      dbresults: {},
      dbtournresults: {},
      isAuthorized: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  async updateState() {
    if (document.cookie.length) {
      var token = document.cookie.substring(13);
      var decoded = jsonWeb.verify(token, "123456");

      await this.setState({
        dbresults: decoded,
        uid: decoded.auth0id
      });
    }

    await axios.get(`/api/tournaments/${this.state.tourneyId}`)
    .then( async (result) => {
      await this.setState({
        dbtournresults: result.data
      });
    }).catch( (error) => {
      console.log(error);
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    let strings = e.target.elements.users.value.split(",");
    let ids = [];
    let message = "";

    strings.forEach( async (item, index) => {
      var temp = item;
      temp = temp.trim();
      await axios.post(`/api/users/search`, {
        email: temp
      })
      .then( (result) => {
        ids[index] = result.data._id;
        if (this.state.dbtournresults.referees.includes(ids[index])) {
          message += ("User " + temp + " already is a referee.\n");
          ids[index] = "DNE";
        }
      })
      .catch( (error) => {
        message += ("There was an error finding user " + temp + ".\n");
        ids[index] = "DNE";
        console.log(error);
      });
    });
    message += "\n";

    ids.forEach( async (item, index) => {
      var temp = item;
      await axios.patch(`/api/tournaments/${this.state.tourneyId}`, {
        referee: temp
      })
      .catch( (error) => {
        if (temp !== "DNE") {
          message += ("There was an error adding user ID " + temp + " to the database.\n");
        }
        console.log(error);
      });
    });

    this.updateState();
    console.log("UPDATED STATE", this.state);

    alert(message);
  }

  render() {
    return(
      <div data-test="theComponent" className="pl-3 pr-3 pt-2">
        <h1 data-test="theMainHeader">Set Referees for Tournament "{this.state.dbtournresults.name}"</h1>
        <div>
          {this.state.isAuthorized && (
            <Form data-test="theForm" onSubmit={this.handleSubmit}>
              <Form.Group controlId="users">
                <Form.Label>Enter user(s) below</Form.Label>
                <Form.Control type="text" placeholder="Enter user email(s) separated by commas" />
              </Form.Group>
              <Button variant="outline-primary" type="submit">Submit</Button>
            </Form>
          )}
          {!this.state.isAuthorized && (
            <h3 data-test="noAuthMsg">You are not authorized for set referee in this tournament.</h3>
          )}
        </div>
      </div>
    );
  }

  async componentDidMount() {
    await axios.get(`/api/users`)
    .then ( (result) => {
        console.log("USERS", result.data);
    })
    .catch( (error) => {
        console.log(error);
    });
    await axios.get(`/api/tournaments`)
    .then ( (result) => {
        console.log("TOURNAMENTS", result.data);
    })
    .catch( (error) => {
        console.log(error);
    });
    await axios.get(`/api/teams`)
    .then ( (result) => {
        console.log("ALL TEAMS", result.data);
    })
    .catch( (error) => {
        console.log(error);
    });
    await axios.get(`/api/teams/tournid/5e7c53f30c6d5700d3701567`)
    .then ( (result) => {
        console.log("ALL TEAMS FROM 5e7c53f30c6d5700d3701567", result.data);
    })
    .catch( (error) => {
        console.log(error);
    });

    await this.updateState();
    console.log("INITIAL SET REFEREE STATE", this.state);

    if (this.state.dbtournresults.headReferee === this.state.dbresults._id ||
        this.state.dbtournresults.director === this.state.dbresults._id) {
      this.state.isAuthorized = true;
    }

    this.setState(this.state);
  }
}

SetReferee.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      tourneyId: PropTypes.string
    })
  })
}

export default SetReferee;
