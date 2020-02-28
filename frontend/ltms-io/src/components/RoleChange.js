import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import logo from '../logo.svg';
import axios from 'axios';

class RoleChange extends Component{

    constructor(props){
        super(props);
        this.state = {
            userEmail: "",
            userEventRole: ""
        }

        this.handleRoleChange = this.handleRoleChange.bind(this);
    }

    handleRoleChange(e) {
        e.preventDefault(e);

        var email = e.target.elements.email.value;
        var eventRole = e.target.elements.eventRole.value;

        this.setState({userEmail: email});
        this.setState({userEventRole: eventRole});

        console.log(this.state.userEmail);
        console.log(this.state.userEventRole);

        axios.patch

    }

    render(){
        return(
            <div>
        <h1>Edit Patron Event Role</h1>
        <div>
          <Container>
            <Row>
              <Col>
                  <h3>Enter Patron Email</h3>
                  <Form onSubmit={this.handleRoleChange}>
                    <Row>
                      <Col xs = "4">
                        <Form.Group controlId="email">
                          <Form.Control type = "email" placeholder = "Email Here"></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col xs = "3">
                        <Form.Group controlId="eventRole">
                          <Form.Control type = "text" placeholder = "New Event Role"></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="outline-primary" type="submit">
                      Submit
                    </Button>
                  </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
        );
    }
}

export default RoleChange;