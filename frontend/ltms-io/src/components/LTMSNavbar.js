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
      dbresults: {}
    };

    this.signOut = this.signOut.bind(this);
  }

  signOut(e) {
    e.preventDefault();
    this.props.auth.logout();
  }

  render() {
    return(
      <div>
        <Navbar data-test="theNavbar" bg="secondary" >
          <Navbar.Brand href="/">
            <img src={logo} data-test="theLogo" alt="logo" width="100" />
          </Navbar.Brand>
          <Nav className="ml-auto">
            {this.props.auth.isAuthenticated() && Object.keys(this.state.dbresults).length && this.state.dbresults.profilePic.imgUrl.length == 0 && (
              <Navbar.Brand href="/accountdetails">
                <img src={sample} alt="profile" width="30" height="30" className="d-inline-block align-top" />
              </Navbar.Brand>
            )}
            {this.props.auth.isAuthenticated() && Object.keys(this.state.dbresults).length && this.state.dbresults.profilePic.imgUrl.length != 0 && (
              <Navbar.Brand href="/accountdetails">
                <img src={this.state.dbresults.profilePic.imgUrl} alt="profile" width="30" height="30" className="d-inline-block align-top" />
              </Navbar.Brand>
            )}
            <NavDropdown alignRight title="Menu">
              <NavDropdown.Item href="/quicklinks">Quick Links</NavDropdown.Item>
              {this.props.auth.isAuthenticated() && (
                <NavDropdown.Item onClick={this.signOut}>Sign Out</NavDropdown.Item>
              )}
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
