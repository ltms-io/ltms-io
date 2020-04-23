import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export default class CreateTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourneyID: this.props.match.params.tourneyId,
      teamNum: null,
      teamName: null
    };

    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };
  handleSubmit = async event => {
    console.log(this.state.tourneyID);
    console.log(this.state.teamNum);
    console.log(this.state.teamName);
    axios
      .post("http://localhost:5000/api/teams/register", {
        tournamentId: this.state.tourneyID,
        teamNum: this.state.teamNum,
        teamName: this.state.teamName
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <h3>Team Creation</h3>
    <Form.Label>Tournament ID: {this.state.tourneyID}</Form.Label>
          <h3>Team Number</h3>
          <Form.Label>Team Number</Form.Label>
          <Form.Control
            required
            placeholder="teamNum"
            name="teamNum"
            onChange={this.handleChange}
          />
          <h3>Team Name</h3>
          <Form.Label>Team Name</Form.Label>
          <Form.Control
            required
            placeholder="teamName"
            name="teamName"
            onChange={this.handleChange}
          />
          <Button className="mt-5" type="submit">
            Create Team
          </Button>
        </Form>
      </div>
    );
  }
}