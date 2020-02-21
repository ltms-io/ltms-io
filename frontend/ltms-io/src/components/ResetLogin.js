import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap'

class ResetLogin extends Component {
  handleUsername(e) {
    e.preventDefault();
    alert("Email reset to: " + e.target.elements.email.value);
  }

  handlePassword(e) {
    e.preventDefault();
    alert("Password reset to: " + e.target.elements.newpw.value);
  }

  render() {
    return(
      <div>
        <h1>Reset Login Information</h1>
        <div>
          <h3>Reset Email Address</h3>
          <Form onSubmit={this.handleUsername}>
            <Form.Group controlId="email">
              <Form.Label>New Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter new email address" />
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div>
          <h3>Reset Password</h3>
          <Form onSubmit={this.handlePassword}>
            <Form.Group controlId="oldpw">
              <Form.Label>Old Password</Form.Label>
              <Form.Control type="password" placeholder="Enter old password" />
            </Form.Group>
            <Form.Group controlId="newpw">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="Enter new password" />
            </Form.Group>
            <Form.Group controlId="confirmnewpw">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm new password" />
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default ResetLogin;
