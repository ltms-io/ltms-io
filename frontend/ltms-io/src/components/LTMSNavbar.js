import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import sample from '../logo.svg';
import logo from '../ltmsio-logo-wide.png';
import axios from 'axios';

class LTMSNavbar extends Component {
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
    // Use this statement instead once backend Auth0 connection for register
    // is complete (5e54b2a86efec099146c054b is random test uid):
    //await axios.get(`http://localhost:5000/api/users/5e54b2a86efec099146c054b`)
    await axios.post(`http://localhost:5000/api/users/auth`, {data: {sub: localStorage.getItem("auth0_id")}})
      .then((result) => {
        this.setState({dbresults: result.data});
      })
      .catch( async (error) => {
          console.log(error);
      });

    this.setState(this.state);

    console.log("INITIAL NAVBAR STATE", this.state);
  }
}

export default LTMSNavbar;
