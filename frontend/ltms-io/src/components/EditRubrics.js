import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export default class EditRubrics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      tourneyId: this.props.match.params.tourneyId,
      teamId: this.props.match.params.teamId,
      dbteamsresults: null
    };
  }
  async componentDidMount() {
    await axios.get(`/api/teams/tournid/${this.state.tourneyId}`)
    .then ( (res) => {
      this.state.dbteamsresults = res.data;
    });
  }
  render() {
    return <div>Hello</div>;
  }
}
