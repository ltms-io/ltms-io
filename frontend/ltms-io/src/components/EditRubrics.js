import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export default class ViewRubrics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      tourneyId: this.props.match.params.tourneyId
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return <div>Hello</div>;
  }
}
