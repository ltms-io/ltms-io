import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export default class CreateTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourneyID: null,
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
  handleSubmit = event => {
    console.log(this.state.tourneyID);
    console.log(this.state.teamNum);
    console.log(this.state.teamName);
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="exampleForm.ID">
            <Form.Label>Enter Tournament ID</Form.Label>
            <Form.Control as="textarea" rows="1" />
          </Form.Group>
          <Form.Group controlId="exampleForm.TeamNum">
            <Form.Label>Enter Team Number</Form.Label>
            <Form.Control as="textarea" rows="1" />
          </Form.Group>
          <Form.Group controlId="exampleForm.TeamName">
            <Form.Label>Enter Team Name</Form.Label>
            <Form.Control as="textarea" rows="1" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
