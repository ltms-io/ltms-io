import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';

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

    await axios.patch(`http://localhost:5000/api/users/updateuser`, {
      auth0id: this.state.uid,
      email: this.state.dbresults.email
    })
    .catch( (error) => {
      console.log(error);
    });


    await axios.post(`http://localhost:5000/api/users/getuser`, {
      auth0id: this.state.uid
    }).then ( (result) => {
        this.state.dbresults = result.data;
    }).catch( (error) => {
        console.log(error);
    });

    await axios({
      method: 'GET',
      url: `https://dev-s68c-q-y.auth0.com/userinfo`,
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem("access_token")
      },
      json: true
    })
    .then( (result) => {
      this.state.authresults = result.data;
      this.state.uid = this.state.authresults.sub;
    })
    .catch( (error) => {
      console.log(error);
    });

    // console.log("UPDATED STATE", this.state);
  }

  async handlePassword(e) {
    e.preventDefault();

    await axios({
      method: 'POST',
      url: 'https://dev-s68c-q-y.auth0.com/dbconnections/change_password',
      headers: {'content-type': 'application/json'},
      data: {
        client_id: '4J9E3tWlJczAxTGBR2YUO61Rmebmlnmf',
        email: this.state.dbresults.email,
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
    // await axios({
    //   method: 'GET',
    //   url: `https://dev-s68c-q-y.auth0.com/userinfo`,
    //   headers: {
    //     'content-type': 'application/json',
    //     'authorization': 'Bearer ' + localStorage.getItem("access_token")
    //   },
    //   json: true
    // })
    // .then( (result) => {
    //   console.log("Auth info: ");
    //   console.log(result);
    //   this.setState({authresults: result.data});
    //   this.setState({uid: this.state.authresults.sub});
    // })
    // .catch( (error) => {
    //   console.log(error);
    // });

    await axios.post(`http://localhost:5000/api/users/getuser`, {
      auth0id: this.state.uid
    }).then ( (result) => {
        this.state.dbresults = result.data;
    }).catch( (error) => {
        console.log(error);
    });

    this.setState(this.state);

    console.log("INITIAL RESET LOGIN STATE", this.state);
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.name,
    email: state.email,
    tournaments: state.tournaments
  }
};

export default connect(mapStateToProps)(ResetLogin);
