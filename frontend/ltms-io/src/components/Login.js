import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

class Login extends Component {
  render() {
    console.log(this.props, "???");
    return (
      <div>
        <p className="App-intro">Hello User</p>
        <div>
          <hr />
          Please login first
          <hr />
          <button onClick={this.props.auth.login}>Login</button>
        </div>
      </div>
    );
  }

  /*handleSubmit(e) {
    e.preventDefault();
    alert(
      "Email: " +
        e.target.elements.email.value +
        "\nPassword: " +
        e.target.elements.password.value
    );
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email address" />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>
          <Button variant="outline-primary" type="submit">
            Log In
          </Button>
        </Form>
      </div>
    );
  }*/
}

export default Login;
