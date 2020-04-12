import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      go: false
    };
  }

  componentDidMount(){
      this.myInterval = setInterval(() => {
          this.setState(prevState => ({
              counter: prevState.counter + 1
          }))
      }, 1000)
  }

  render() {
  return <div>Timer: {this.state.counter}</div>;
  }
}
