import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap'

class Login extends Component {
  render () {
    return(
      <div>
        <h1>Login</h1>
        <Form>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email address" />
            <Form.Text className="text-muted">
              We'll share your email and SSN with everyone.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
            <Form.Text className="text-muted">
              We'll share your email and SSN with everyone.
            </Form.Text>
          </Form.Group>
          <Button variant="outline-primary" type="">
            Log In
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
