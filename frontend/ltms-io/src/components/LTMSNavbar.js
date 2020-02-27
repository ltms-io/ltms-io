import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import sample from '../logo.svg';
import logo from '../ltmsio-logo-wide.png';

class LTMSNavbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Navbar bg="secondary" >
          <Navbar.Brand href="/">
            <img src={logo} width="100" />
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Navbar.Brand href="/accountdetails">
              <img src={sample} width="30" height="30"
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
}

export default LTMSNavbar;
