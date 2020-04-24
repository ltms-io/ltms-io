import React, { Component } from 'react';
import { Button, Container, Row, Col, Jumbotron } from "react-bootstrap";

class Home extends Component {
  render() {
    return (

      <div className="pl-3 pr-3 pt-2">
        <h1 className="text-center">Welcome!</h1>

        {!this.props.auth.isAuthenticated() && (

          <Container>
            <Row className="justify-content-md-center">
              <Col className="p-5">
                <Jumbotron className="text-center">
                  <h1 className="pb-3">LEGO Tournament Management System</h1>
                  <Button onClick={this.props.auth.login} className="" size="lg" block>Login or Register</Button>
                </Jumbotron>
              </Col>
            </Row>
          </Container>
        )}

        {this.props.auth.isAuthenticated() && (
          <div>(You are authenticated!)</div>
        )}
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/dashboard">Dashboard</a>
          </div>
        )}
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/createtournament">Create A Tournament</a>
          </div>
        )}
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/accountdetails">Edit Account Details</a>
          </div>
        )}
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/pictureuploadtest">Picture Upload Test</a>
          </div>)}
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/createscoresheet">Create A Scoresheet</a>
          </div>)}
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/volunteermodaltest">Volunteer Assignment Modal Test</a>
          </div>)}
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/maindashboard">The Real Dashboard</a>
          </div>)}
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/rolechange">Change User Role</a>
          </div>)}
        {this.props.auth.isAuthenticated() && (
          <button onClick={this.props.auth.logout}>Logout</button>
        )}


      </div>
    );
  }
}

export default Home;
