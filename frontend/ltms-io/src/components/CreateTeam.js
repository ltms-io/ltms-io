import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import jsonWeb from 'jsonwebtoken';
import { Pacman } from 'react-pure-loaders';
import LoadingOverlay from 'react-loading-overlay';

export default class CreateTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourneyId: this.props.match.params.tourneyId,
      uid: "",
      dbresults: {},
      dbtournresults: {},
      isAuthorized: false,
      uploading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    e.persist();
    await this.setState({
      uploading: true
    });
    await axios.post("/api/teams/register", {
      tournamentId: this.state.tourneyId,
      teamNum: e.target.elements.teamNum.value,
      teamName: e.target.elements.teamName.value
    })
    .then( async (res) => {
      await this.setState({
        uploading: false
      });
    })
    .catch( (err) => {
      console.log(err);
    });
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
    .then( async (res) => {
      await this.setState({
        dbtournresults: res.data
      });
    })
    .catch( (err) => {
      console.log(err);
    });

    if (this.state.dbtournresults.director === this.state.dbresults._id) {
      await this.setState({
        isAuthorized: true
      })
    }
  }

  async componentDidMount() {
    await this.updateState();
    console.log("INITIAL CREATE TEAM STATE", this.state);
  }

  render() {
    return (
      <LoadingOverlay active={this.state.uploading} spinner={<Pacman loading color="black" />} text='Loading...' >
        <div className="pl-3 pr-3 pt-2">
          <h1>Create Team for Tournament "{this.state.dbtournresults.name}"</h1>
          <div>
            {this.state.isAuthorized && (
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="teamNum">
                  <Form.Label>Team Number</Form.Label>
                  <Form.Control required placeholder="Enter the team number"/>
                </Form.Group>
                <Form.Group controlId="teamName">
                  <Form.Label>Team Name</Form.Label>
                  <Form.Control required placeholder="Enter the team name"/>
                </Form.Group>
                <Button type="submit">Submit</Button>
              </Form>
            )}
            {!this.state.isAuthorized && (
              <h3>You are not authorized for create team in this tournament.</h3>
            )}
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}
