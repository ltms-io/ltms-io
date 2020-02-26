import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class ResetLogin extends Component {
  state = {
    user: {}
  };

  constructor(props) {
    super(props);

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  async handleUsername(e) {
    e.preventDefault();
    alert("Email reset to: " + e.target.elements.email.value);
    this.state.user.email = e.target.elements.email.value;
    console.log("Updated state:");
    console.log(this.state);
    await axios.patch("http://localhost:5000/api/users/5e54b2a86efec099146c054b", {
      email: this.state.user.email
    });
    await axios.get("http://localhost:5000/api/users/5e54b2a86efec099146c054b")
      .then ( (result) => {
        console.log("Updated GET:");
        console.log(result);
      });
  }

  handlePassword(e) {
    e.preventDefault();
    alert("Password reset to: " + e.target.elements.newpw.value);
  }

  render() {
    return(
      <div>
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

  async componentDidMount() {
    await axios.get("http://localhost:5000/api/users/5e54b2a86efec099146c054b")
      .then ( (result) => {
        console.log("Initial GET:");
        console.log(result);
        this.setState({user: result.data});
      });
  }
}

export default ResetLogin;
