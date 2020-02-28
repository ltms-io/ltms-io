import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import ResetLogin from './ResetLogin';
import logo from '../logo.svg';
import axios from 'axios';

class AccountDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      dbresults: {},
      authresults: {}
    };

    this.handleName = this.handleName.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleName(e) {
    e.preventDefault();
    alert("Resetting name to: " + e.target.elements.name.value);
    // Use this statement instead once backend Auth0 connection for register
    // is complete (5e54b2a86efec099146c054b is random test uid):
    //await axios.patch("http://localhost:5000/api/users/5e54b2a86efec099146c054b", {
    await axios.patch(`http://localhost:5000/api/users/updateuser`, {
      auth0id: localStorage.getItem("auth0_id"),
     // email: this.state.dbresults.email,
      name: e.target.elements.name.value
    })
    .then((res) => {
      console.log(res.data);
      this.setState({dbresutls: res.data});
    })
    .catch( (error) => {
      console.log(error);
    });

    // Use this statement instead once backend Auth0 connection for register
    // is complete (5e54b2a86efec099146c054b is random test uid):
    //await axios.get(`http://localhost:5000/api/users/5e54b2a86efec099146c054b`)
    // await axios.get(`http://localhost:5000/api/users/${this.state.uid}`)
    //   .then ( (result) => {
    //     this.state.dbresults = result.data;
    //   })
    //   .catch( (error) => {
    //     console.log(error);
    //   });

    console.log("UPDATED STATE", this.state);
  }

  async handleDelete(e) {
    e.preventDefault();
    alert("Deleting account!");

    // Use this statement instead once backend Auth0 connection for register
    // is complete (5e54b2a86efec099146c054b is random test uid):
    //await axios.delete("http://localhost:5000/api/users/5e54b2a86efec099146c054b")
    await axios.delete(`http://localhost:5000/api/users/${this.state.dbresults._id}`)
    .catch( (error) => {
      console.log(error);
    });

    this.props.auth.logout();
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

    // Use this statement instead once backend Auth0 connection for register
    // is complete (5e54b2a86efec099146c054b is random test uid):
    //await axios.get(`http://localhost:5000/api/users/5e54b2a86efec099146c054b`)
    await axios.post(`http://localhost:5000/api/users/auth`, {data: {sub: localStorage.getItem("auth0_id")}})
      .then ( (result) => {
        this.state.dbresults = result.data;
      })
      .catch( (error) => {
        console.log(error);
      });

    this.setState(this.state);

    console.log("INITIAL ACCOUNT DETAILS STATE", this.state);
  }
}

export default AccountDetails;
