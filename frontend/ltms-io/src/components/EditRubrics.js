import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export default class EditRubrics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      tourneyId: this.props.match.params.tourneyId
    };
  }

  render() {
    return <div>Hello</div>;
  }
}
