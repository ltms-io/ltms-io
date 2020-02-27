import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class ResetLogin extends Component {

  constructor(props) {
    super(props);

    this.state = {
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

    console.log("ATTEMPTING AUTH0 EMAIL PATCH");
    await axios({
      method: 'PATCH',
      url: `https://dev-s68c-q-y.auth0.com/api/v2/users/${this.state.uid}`,
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem("access_token")
      },
      body: {
        email: this.state.dbresults.email,
        connection: 'Username-Password-Authentication'
      },
      json: true
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

    await axios({
      method: 'POST',
      url: 'https://dev-s68c-q-y.auth0.com/dbconnections/change_password',
      headers: {'content-type': 'application/json'},
      data: {
        client_id: '4J9E3tWlJczAxTGBR2YUO61Rmebmlnmf',
        email: this.state.authresults.name,
        connection: 'Username-Password-Authentication'
      },
      json: true
    })
    .catch( (error) => {
      console.log(error);
    });
    alert("An email has been sent to you with a link to reset your password.");
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
          <Button variant="outline-primary" onClick={this.handlePassword}>
            Send Password Reset Link
          </Button>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    await axios.get(`https://dev-s68c-q-y.auth0.com/userinfo?access_token=${localStorage.getItem("access_token")}`)
      .then( (result) => {
        this.state.authresults = result.data;
        this.state.uid = this.state.authresults.sub;
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
