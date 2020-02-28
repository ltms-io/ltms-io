import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../logo.svg';
import axios from 'axios';

class LTMSNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      dbresults: {},
      authresults: {}
    };
  }

  render() {
    return(
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">LTMS.io</Navbar.Brand>
          <Nav className="ml-auto">
            <Navbar.Brand href="/accountdetails">
              <img alt="logo" src={logo} width="30" height="30"
                   className="d-inline-block align-top" />
            </Navbar.Brand>
            <NavDropdown alignRight title="Menu">
              <NavDropdown.Item>Quick Links</NavDropdown.Item>
              <NavDropdown.Item>Sign Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }

  async componentDidMount() {
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

    // Use this statement instead once backend Auth0 connection for register
    // is complete (5e54b2a86efec099146c054b is random test uid):
    //await axios.get(`http://localhost:5000/api/users/5e54b2a86efec099146c054b`)
    await axios.get(`http://localhost:5000/api/users/${this.state.uid.substring(6)}`)
      .then ( (result) => {
        this.state.dbresults = result.data;
      })
      .catch( async (error) => {
          console.log(error);
      });

    this.setState(this.state);

    console.log("INITIAL NAVBAR STATE", this.state);
  }
}

export default LTMSNavbar;
