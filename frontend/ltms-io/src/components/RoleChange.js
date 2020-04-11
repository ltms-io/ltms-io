import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import logo from '../logo.svg';
const axios = require('axios');

class RoleChange extends Component{

    constructor(props){
        super(props);
        this.state = {
            userEmail: "",
        }

        this.handleRoleChange = this.handleRoleChange.bind(this);
    }

    handleRoleChange(e) {
        e.preventDefault(e);

        var email = e.target.elements.email.value;

        this.setState({userEmail: email});

        console.log(this.state.userEmail);

        axios.patch('http://localhost:5000/api/users/authorization/', {data:{email: this.state.userEmail}}).then(function(response){
          console.log(response);
        }).catch(function(err){
          console.log(err);
        })

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