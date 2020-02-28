import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import ResetLogin from './ResetLogin';
import logo from '../logo.svg';
import axios from 'axios';

class AccountDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dbresults: {}
    };

    this.handleName = this.handleName.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleName(e) {
    e.preventDefault();
    alert("Resetting name to: " + e.target.elements.name.value);
    this.state.dbresults.name = e.target.elements.name.value;
    // Use this statement instead once backend Auth0 connection for register
    // is complete (5e54b2a86efec099146c054b is random test uid):
    // await axios.patch(`http://localhost:5000/api/users/${this.state.uid}`, {
    await axios.patch("http://localhost:5000/api/users/5e54b2a86efec099146c054b", {
      email: this.state.dbresults.email,
      name: this.state.dbresults.name
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

  async handleDelete(e) {
    e.preventDefault();
    alert("Deleting account!");
    // Use this statement instead once backend Auth0 connection for register
    // is complete (5e54b2a86efec099146c054b is random test uid):
    // await axios.delete(`http://localhost:5000/api/users/${this.state.uid}`)

    //DANGEROUS
    /*
    await axios.delete("http://localhost:5000/api/users/5e54b2a86efec099146c054b")
    .catch( (error) => {
      console.log(error);
    });
    */

    await axios({
      method: 'DELETE',
      url: `https://dev-s68c-q-y.auth0.com/api/v2/users/${this.state.uid}`,
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem("access_token")
      },
      body: {},
      json: true
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  render() {
    return(
      <div>
        <h1>Edit Account Details</h1>
        <div>
          <Container>
            <Row>
              <Col>
                <div>
                  <h3>Edit Profile Picture</h3>
                  <img alt="profile" src={logo} />
                </div>
                <div>
                  <h3>Edit Name</h3>
                  <Form onSubmit={this.handleName}>
                    <Row>
                      <Col>
                        <Form.Group controlId="name">
                          <Form.Control defaultValue={this.state.dbresults.name} />
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
        </div>
        <div>
          <Button variant="outline-danger" onClick={this.handleDelete}>
            Delete my Account
          </Button>
        </div>
      </div>
    );
  }

  async componentDidMount() {
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

    this.setState({ state: this.state });
    console.log("INITIAL STATE", this.state);
  }
}

export default AccountDetails;
