import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { Pacman } from 'react-pure-loaders';
import LoadingOverlay from 'react-loading-overlay';
const jsonWeb = require('jsonwebtoken');

class ResetLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      dbresults: {},
      uploading: false
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  async handleUsername(e) {
    e.preventDefault();
    e.persist();
    await this.setState({
      uploading: true
    });

    this.state.dbresults.email = e.target.elements.email.value;
    await this.setState(this.state);

    await axios.patch(`/api/users/updateuser`, {
      auth0id: this.state.uid,
      email: this.state.dbresults.email
    })
    .catch( (error) => {
      console.log(error);
    });

    await axios.post('/api/users/login', {data: this.state.uid}).then( (result) => {
      document.cookie = "UserIdentity=" + token + "; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      document.cookie = "UserIdentity=" + result.data;
    });

    var token = document.cookie.substring(13);
    var decoded = jsonWeb.verify(token, "123456");

    this.state.dbresults = decoded;
    this.state.uid = decoded.auth0id;

    this.setState(this.state);
    console.log("UPDATED STATE", this.state);

    await this.setState({
      uploading: false
    });
  }

  async handlePassword(e) {
    e.preventDefault();
    e.persist();
    await this.setState({
      uploading: true
    });

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
    await this.setState({
      uploading: false
    });
    
    alert("An email has been sent to you with a link to reset your password.");
  }

  async componentDidMount() {
    if (document.cookie.length) {
      var token = document.cookie.substring(13);
      var decoded = jsonWeb.verify(token, "123456");

      await this.setState({
        dbresults: decoded,
        uid: decoded.auth0id
      });
    }

    console.log("INITIAL RESET LOGIN STATE", this.state);
  }

  render() {
    return(
      <LoadingOverlay active={this.state.uploading} spinner={<Pacman loading color="black" />} text='Loading...' >
        <div>
          <div>
            <h3 className="pb-1">Reset Email Address</h3>
            <Form onSubmit={this.handleUsername}>
              <Form.Group controlId="email">
                <Form.Control type="email" placeholder="Enter new email address" />
              </Form.Group>
              <Button type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <hr />
          <div>
            <h3 className="pb-1">Reset Password</h3>
            <Button onClick={this.handlePassword}>
              Send Password Reset Link
            </Button>
          </div>
        </div>
      </LoadingOverlay>
    );
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
