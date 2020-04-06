import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import sample from '../logo.svg';
import logo from '../ltmsio-logo-wide.png';
import axios from 'axios';
const jsonWeb = require('jsonwebtoken');

class LTMSNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      profilepic: "",
      dbresults: {}
    };
  }

  render() {
    return(
      <div>
        <Navbar data-test="theNavbar" bg="secondary" >
          <Navbar.Brand href="/">
            <img src={logo} alt="logo" width="100" />
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Navbar.Brand href="/accountdetails">
              <img src={sample} data-test="theLogo" alt="profile" width="30" height="30" className="d-inline-block align-top" />
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
    if (document.cookie.length) {
      var token = document.cookie.substring(13);
      var decoded = jsonWeb.verify(token, "123456");

      this.state.dbresults = decoded;
      this.state.uid = decoded.auth0id;
    }
    this.setState(this.state);

    console.log("INITIAL NAVBAR STATE", this.state);
  }
}

export default LTMSNavbar;
