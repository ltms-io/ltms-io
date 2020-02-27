import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import logo from '../logo.svg';

class RoleChange extends Component{
    render(){
        return(
            <div>
        <h1>Edit Patron Event Role</h1>
        <div>
          <Container>
            <Row>
              <Col>
                  <h3>Enter Patron Email</h3>
                  <Form>
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