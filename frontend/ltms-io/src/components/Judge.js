import React, { Component } from "react";

export default class Judge extends Component {
  render() {
    return (
      <div>
        <Form>
          <Form.Group controlId="exampleForm.ID">
            <Form.Label>Enter Judge ID</Form.Label>
            <Form.Control as="textarea" rows="1" />
          </Form.Group>
          <Form.Group controlId="exampleForm.TeamNum">
            <Form.Label>Enter Team Number</Form.Label>
            <Form.Control as="textarea" rows="1" />
          </Form.Group>
          <Form.Group controlId="exampleForm.AwardType">
            <Form.Label>Enter Award Type</Form.Label>
            <Form.Control as="textarea" rows="1" />
          </Form.Group>
          <Form.Group controlId="exampleForm.Time">
            <Form.Label>Enter Date and Time</Form.Label>
            <Form.Control as="textarea" rows="1" />
          </Form.Group>
          <Form.Group controlId="exampleForm.Room">
            <Form.Label>Enter Room Number</Form.Label>
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
