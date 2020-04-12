import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export default class ViewRubrics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: []
    };
  }

  render() {
    return <div>Hello Timer</div>;
  }
}
