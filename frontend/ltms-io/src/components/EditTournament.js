import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";

export default class EditTournament extends Component {
  render() {
    return (
      <div>
        <Form>
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
