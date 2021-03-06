import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import logo from '../ltmsio-logo-wide.png';
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
        <Navbar data-test="theNavbar" bg="info" >
          {((this.props.auth && this.props.auth.isAuthenticated()) || this.props.testAuthorized) && (
            <Navbar.Brand href="/maindashboard">
              <img data-test="theLogo" src={logo} alt="logo" width="100" />
            </Navbar.Brand>
          )}
          {((this.props.auth && !this.props.auth.isAuthenticated()) || this.props.testAuthorized === false) && (
            <Navbar.Brand href="/">
              <img data-test="theLogo" src={logo} alt="logo" width="100" />
            </Navbar.Brand>
          )}
          <Nav className="ml-auto">
            {((this.props.auth && this.props.auth.isAuthenticated()) || this.props.testAuthorized) &&
             ((Object.keys(this.state.dbresults).length !== 0 && this.state.dbresults.profilePic.imgUrl.length === 0) || this.props.testProfPic) && (
               <Button data-test="theSampleProfilePic" variant="outline-dark" href="/accountdetails" >Account Details</Button>
            )}
            {((this.props.auth && this.props.auth.isAuthenticated()) || this.props.testAuthorized) &&
             (Object.keys(this.state.dbresults).length !== 0 && this.state.dbresults.profilePic.imgUrl.length !== 0) && (
              <Navbar.Brand href="/accountdetails">
                <img data-test="theRealProfilePic" src={this.state.dbresults.profilePic.imgUrl} alt="profile" width="30" height="30" className="d-inline-block align-top" />
              </Navbar.Brand>
            )}
            <NavDropdown className="pl-3"alignRight title="Menu">
              <NavDropdown.Item data-test="theQuickLinksOption" href="/quicklinks">Quick Links</NavDropdown.Item>
              {((this.props.auth && this.props.auth.isAuthenticated()) || this.props.testAuthorized) && (
                <NavDropdown.Item data-test="theCreateTournamentOption" href="/createtournament">Create a Tournament</NavDropdown.Item>
              )}
              {((this.props.auth && this.props.auth.isAuthenticated()) || this.props.testAuthorized) && (
                <NavDropdown.Item data-test="theSignOutOption" onClick={this.signOut}>Sign Out</NavDropdown.Item>
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
      try {
      var decoded = jsonWeb.verify(token, "123456");

      this.state.dbresults = decoded;
      this.state.uid = decoded.auth0id;
      } catch(err) {
        console.log(err);
      }
    }
    this.setState(this.state);

    console.log("INITIAL NAVBAR STATE", this.state);
  }
}

export default LTMSNavbar;
