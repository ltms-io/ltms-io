import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import ResetLogin from './ResetLogin';
import logo from '../logo.svg';
import axios from 'axios';
const jsonWeb = require("jsonwebtoken")

class AccountDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      profilepic: "",
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

    var token = document.cookie.substring(13);
    var decoded = jsonWeb.verify(token, "123456");
    await axios.patch(`http://localhost:5000/api/users/updateuser`, {
      auth0id: decoded.auth0id,
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
    
    //This updates the json token saved as a cookie by creating a new token then saving it
    await axios.post('http://localhost:5000/api/users/login', {data: {sub: decoded.auth0id}}).then( (result) => {
      var token = document.cookie.substring(13);
      document.cookie = "UserIdentity=" + token + "; expires=Thu, 01 Jan 1970 00:00:00 UTC";

      document.cookie = "UserIdentity=" + result.data;

    }).catch(function(err){
      console.log(err);
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
    var token = document.cookie.substring(13);
    document.cookie = "UserIdentity=" + token + "; expires=Thu, 01 Jan 1970 00:00:00 UTC";
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
                  {this.state.profilepic ? <img src={this.state.profilepic.imgUrl} /> : <img src={logo} alt="account"/>}
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
    
    // await axios.post(`http://localhost:5000/api/users/auth`, {data: {sub: localStorage.getItem("auth0_id")}})
    //   .then ( (result) => {
    //     this.state.dbresults = result.data;
    //     this.state.profilepic = result.data.profilepic.imgUrl;
    //   })
    //   .catch( (error) => {
    //     console.log(error);
    //   });

    // Using this so that we don't need to access the database every time a 
    // component is mounted
    var token = document.cookie.substring(13);
    var decoded = jsonWeb.verify(token, "123456");

    this.state.dbresults = decoded;
    this.state.profilepic = decoded.profilePic.imgUrl;
    this.setState(this.state);

    console.log("INITIAL ACCOUNT DETAILS STATE", this.state);
  }
}

export default AccountDetails;
