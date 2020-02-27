import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class ResetLogin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accesstoken: "",
      uid: "",
      dbresults: {},
      authresults: {}
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  async handleUsername(e) {
    e.preventDefault();
    alert("Resetting email to: " + e.target.elements.email.value);
    this.state.dbresults.email = e.target.elements.email.value;
    // Use this statement instead once backend Auth0 connection for register
    // is complete (5e54b2a86efec099146c054b is random test uid):
    // await axios.patch(`http://localhost:5000/api/users/${this.state.uid}`, {
    await axios.patch("http://localhost:5000/api/users/5e54b2a86efec099146c054b", {
      email: this.state.dbresults.email
    })
    .catch( (error) => {
      console.log(error);
    });

    // Use this statement instead once backend Auth0 connection for register
    // is complete (5e54b2a86efec099146c054b is random test uid):
    // await axios.get(`http://localhost:5000/api/users/${this.state.uid}`)
    await axios.get(`http://localhost:5000/api/users/5e54b2a86efec099146c054b`)
      .then ( (result) => {
        this.state.dbresults = result.data;
      })
      .catch( (error) => {
        console.log(error);
      });

    console.log("UPDATED STATE", this.state);

  }

  async handlePassword(e) {
    e.preventDefault();

    if (e.target.elements.oldpw.value !== this.state.dbresults.password) {

      alert("Invalid old password!: " + e.target.elements.oldpw.value);
    }
    else if (e.target.elements.newpw.value !==
             e.target.elements.confirmnewpw.value) {
      alert("New password entries do not match!");
    }
    else {
      alert("Resetting password to: " + e.target.elements.newpw.value);
      this.state.dbresults.password = e.target.elements.newpw.value;
      // Use this statement instead once backend Auth0 connection for register
      // is complete (5e54b2a86efec099146c054b is random test uid):
      // await axios.patch(`http://localhost:5000/api/users/${this.state.uid}`, {
      await axios.patch("http://localhost:5000/api/users/5e54b2a86efec099146c054b", {
        email: this.state.dbresults.email,
        password: this.state.dbresults.password

      })
      .catch( (error) => {
        console.log(error);
      });

      // Use this statement instead once backend Auth0 connection for register
      // is complete (5e54b2a86efec099146c054b is random test uid):
      // await axios.get(`http://localhost:5000/api/users/${this.state.uid}`)
      await axios.get(`http://localhost:5000/api/users/5e54b2a86efec099146c054b`)
        .then ( (result) => {
          this.state.dbresults = result.data;
        })
        .catch( (error) => {
          console.log(error);
        });

      console.log("UPDATED STATE", this.state);
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
    this.state.accesstoken = localStorage.getItem("access_token");
    await axios.get(`https://dev-s68c-q-y.auth0.com/userinfo?access_token=${this.state.accesstoken}`)
      .then( (result) => {
        this.state.authresults = result.data;
        this.state.uid = this.state.authresults.sub.substring(6);
      }).catch( (error) => {
        console.log(error)
      });

    // Use this statement instead once backend Auth0 connection for register
    // is complete (5e54b2a86efec099146c054b is random test uid):
    // await axios.get(`http://localhost:5000/api/users/${this.state.uid}`)
    await axios.get(`http://localhost:5000/api/users/5e54b2a86efec099146c054b`)
      .then ( (result) => {
        this.state.dbresults = result.data;
      })
      .catch( (error) => {
        console.log(error);
      });

    console.log("INITIAL STATE", this.state);
  }
}

export default ResetLogin;
