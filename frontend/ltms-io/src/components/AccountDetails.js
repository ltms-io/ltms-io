import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import ResetLogin from './ResetLogin';
import axios from 'axios';
const jsonWeb = require('jsonwebtoken');

class AccountDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      profilepic: "",
      dbresults: {}
    };

    this.handleName = this.handleName.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleName(e) {
    e.preventDefault();
    alert("Resetting name to: " + e.target.elements.name.value);
    this.state.dbresults.name = e.target.elements.name.value;

    await axios.patch(`/api/users/updateuser`, {
      auth0id: this.state.uid,
      name: this.state.dbresults.name
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
  }

  async handleDelete(e) {
    e.preventDefault();
    alert("Deleting account!");

    await axios.delete(`/api/users/${this.state.dbresults._id}`)
    .catch( (error) => {
      console.log(error);
    });

    this.props.auth.logout();
  }

  render() {
    return(
      <div className="pl-3 pr-3 pt-2">
        <h1 className="text-center pb-2">Account Details</h1>
        <div>
          <Container>
            <Row>
              <Col>
                {/*
                <div>
                  <h3>Edit Profile Picture</h3>
                  {(this.state.dbresults.profilePic && this.state.dbresults.profilePic.imgUrl.length !== 0) ? <img src={this.state.dbresults.profilePic.imgUrl} width="250" height="250" alt="account" /> : <img src={logo} width="250" height="250" alt="account" />}
                </div>
                <hr />
                */}
                <div>
                  <h3 className="pb-1">Edit Name</h3>
                  <Form onSubmit={this.handleName}>
                    <Row>
                      <Col>
                        <Form.Group controlId="name">
                          <Form.Control defaultValue={this.state.dbresults.name} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button type="submit">
                      Submit
                    </Button>
                  </Form>
                </div>
              </Col>
              <Col>
                <ResetLogin />
              </Col>
            </Row>
            <hr />
          </Container>
        </div>
        <div className="text-center">
          <Button variant="danger" onClick={this.handleDelete}>
            Delete my Account
          </Button>
        </div>
      </div>
    );
  }


  async componentDidMount() {
    var token = document.cookie.substring(13);
    var decoded = jsonWeb.verify(token, "123456");

    this.state.dbresults = decoded;
    this.state.uid = decoded.auth0id;

    this.setState(this.state);

    console.log("INITIAL ACCOUNT DETAILS STATE", this.state);
  }
}

export default AccountDetails;
