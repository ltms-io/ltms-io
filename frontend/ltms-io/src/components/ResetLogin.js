import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class ResetLogin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  async handleUsername(e) {
    e.preventDefault();

    alert("Resetting email to: " + e.target.elements.email.value);
    this.state.user.email = e.target.elements.email.value;
    console.log("Updated state:");
    console.log(this.state);
    await axios.patch("http://localhost:5000/api/users/5e54b2a86efec099146c054b", {
      email: this.state.user.email
    })
    .catch( (error) => {
      console.log(error);
    });

    await axios.get("http://localhost:5000/api/users/5e54b2a86efec099146c054b")
      .then( (result) => {
        console.log("Updated GET:");
        console.log(result);
      })
      .catch( (error) => {
        console.log(error);
      });
  }

  async handlePassword(e) {
    e.preventDefault();

    if (e.target.elements.oldpw.value !== this.state.user.password) {
      alert("Invalid old password!: " + e.target.elements.oldpw.value);
    }
    else if (e.target.elements.newpw.value !==
             e.target.elements.confirmnewpw.value) {
      alert("New password entries do not match!");
    }
    else {
      alert("Resetting password to: " + e.target.elements.newpw.value);
      this.state.user.password = e.target.elements.newpw.value;
      console.log("Updated state:");
      console.log(this.state);
      await axios.patch("http://localhost:5000/api/users/5e54b2a86efec099146c054b", {
        email: this.state.user.email,
        password: this.state.user.password
      })
      .catch( (error) => {
        console.log(error);
      });

      await axios.get("http://localhost:5000/api/users/5e54b2a86efec099146c054b")
        .then( (result) => {
          console.log("Updated GET:");
          console.log(result);
        })
        .catch( (error) => {
          console.log(error);
        });
    }
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
      })
      .catch( (error) => {
        console.log(error);
      });
  }
}

export default ResetLogin;
