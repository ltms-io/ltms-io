import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import sample from '../logo.svg';
import logo from '../ltmsio-logo-wide.png';
import axios from 'axios';
const jsonWeb = require('jsonwebtoken');

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
    // Use this statement instead once backend Auth0 connection for register
    // is complete (5e54b2a86efec099146c054b is random test uid):
    //await axios.get(`http://localhost:5000/api/users/5e54b2a86efec099146c054b`)
    if(localStorage.getItem("auth0_id") || !document.cookie.length){
      
      console.log("AXIOS!!!");
      await axios.post(`http://localhost:5000/api/users/auth`, {data: localStorage.getItem("auth0_id")})
        .then ((result) => {
          this.setState({dbresults: result.data});
        })
        .catch( (error) => {
          console.log(error);
        });
      
    }else{
      console.log("HERE!!!");
      var token = document.cookie.substring(13);
      var stat = jsonWeb.verify(token, "123456", function(err, decoded) {
        if(err){
          axios.post(`http://localhost:5000/api/users/auth`, {data: localStorage.getItem("auth0_id")})
          .then ((result) => {
            return result.data;
          })
          .catch( (error) => {
            console.log(error);
          });
        }else{
          return decoded;
        }
      });

      if(stat){
        this.setState({dbresults: stat});
      }
    }
    this.setState(this.state);

    console.log("INITIAL NAVBAR STATE", this.state);

  }
}

export default LTMSNavbar;
