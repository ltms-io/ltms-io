import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import PropTypes from "prop-types";

class CreateJudges extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourneyId: this.props.match.params.tourneyId,
      dbresults: {},
      dbtournresults: {},
      authresults: {},
      isAuthorized: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    alert(e.target.elements.users.value);
    var strings = e.target.elements.users.value.split(",");
    var ids = [];
    var message = "";
    strings.forEach( async (item, index) => {
      var temp = item;
      temp = temp.trim();
      await axios.post(`/api/users/search`, {
        email: temp
      })
      .then( (result) => {
        ids[index] = result.data._id;
        if (this.state.dbtournresults.judges.includes(ids[index])) {
          message += ("User " + temp + " already is a judge.\n");
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
        judge: temp
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

    await axios.post(`/api/users/getuser`, {
      auth0id: this.state.authresults.sub
    }).then ( (result) => {
        this.state.dbresults = result.data;
    }).catch( (error) => {
        console.log(error);
    });

    await axios.get(`/api/tournaments/${this.state.tourneyId}`)
    .then( (result) => {
        this.state.dbtournresults = result.data;
    }).catch( (error) => {
        console.log(error);
    });

    this.setState(this.state);
  }

  render() {
    return(
      <div data-test="theComponent">
        <h1 data-test="theMainHeader">Set Judge for {this.state.dbtournresults.name}</h1>
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
            <h3 data-test="noAuthMsg">You are not authorized for set judges in this tournament.</h3>
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
    console.log("INITIAL SET JUDGE STATE", this.state);

    if (this.state.dbtournresults.judgeAdvisor.includes(this.state.dbresults._id) ||
        this.state.dbtournresults.director === this.state.dbresults._id) {
      this.state.isAuthorized = true;
    }

    this.setState(this.state);
  }
}

CreateJudges.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      tourneyId: PropTypes.string
    })
  })
}

export default CreateJudges;
