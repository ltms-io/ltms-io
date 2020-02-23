import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import ResetLogin from './ResetLogin';
import logo from '../logo.svg';

class AccountDetails extends Component {
  constructor(props) {
    super(props);
    
    this.handleName = this.handleName.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleName(e) {
    e.preventDefault();
    alert("Name reset to: " + e.target.elements.firstname.value + " " +
          e.target.elements.lastname.value);
  }

  handleDelete(e) {
    e.preventDefault();
    alert("Deleting account!");
  }

  render() {
    return(
      <div>
        <h1>Edit Account Details</h1>
        <Container>
          <Row>
            <Col>
              <div>
                <h3>Edit Profile Picture</h3>
                <img src={logo} />
              </div>
              <div>
                <h3>Edit Name</h3>
                <Form onSubmit={this.handleName}>
                  <Row>
                    <Col>
                      <Form.Group controlId="firstname">
                        <Form.Control />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="lastname">
                        <Form.Control />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="outline-primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </Col>
            <Col>
              <ResetLogin />
            </Col>
          </Row>
        </Container>
        <Button variant="outline-danger" onClick={this.handleDelete}>
          Delete my Account
        </Button>
      </div>
    );
  }
}

export default AccountDetails;
