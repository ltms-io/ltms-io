import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import sample from '../logo.svg';
import logo from '../ltmsio-logo-wide.png';
import axios from 'axios';

class LTMSNavbar extends Component {
  render() {
    return(
      <div>
        <Navbar bg="secondary" >
          <Navbar.Brand href="/">
            <img src={logo} alt="logo" width="100" />
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Navbar.Brand href="/accountdetails">
              <img src={sample} alt="profile" width="30" height="30"
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
    await axios.get(`http://localhost:5000/api/users/`)
    .then ( (result) => {
      console.log("CURRENT USERS");
      console.log(result);
    }).catch( (error) => {
        console.log(error);
    });
  }
}

export default LTMSNavbar;
