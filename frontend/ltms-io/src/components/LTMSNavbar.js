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
      dbresults: {},
      authresults: {}
    };
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
    
    // Using this so that we don't need to access the database every time a 
    // component is mounted

    if(localStorage.getItem("auth0_id") || !document.cookie.length){
      
      console.log("AXIOS!!!");
      await axios.post(`http://localhost:5000/api/users/auth`, {data: localStorage.getItem("auth0_id")})
        .then ((result) => {
          this.state.dbresults = result.data;
        })
        .catch( (error) => {
          console.log(error);
        });
      
    }else{
      console.log("HERE!!!");
      var token = document.cookie.substring(13);
      var state = jsonWeb.verify(token, "123456", async function(err, decoded) {
        if(err){
          await axios.post(`http://localhost:5000/api/users/auth`, {data: localStorage.getItem("auth0_id")})
          .then ((result) => {
            this.state.dbresults = result.data;
          })
          .catch( (error) => {
            console.log(error);
          });
        }else{
          return decoded;
        }
      });
    }
    this.state.dbresults = state;
    this.setState(this.state);

    console.log("INITIAL NAVBAR STATE", this.state);
  }
}

export default LTMSNavbar;
