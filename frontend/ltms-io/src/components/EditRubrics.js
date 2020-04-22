import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export default class EditRubrics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      teamId: this.props.match.params.teamId,
      email: this.props.match.params.email,
      uniqueID: this.props.match.params.uniqueID,
      rubric: [],
      dbteamsresults: null
    };
  }
  async componentDidMount() {
    console.log(this.state);
    await axios.post(`/api/teams/rubricget/${this.state.teamId}`, {
      email: this.state.email,
      uniqueID: this.state.uniqueID
    }
    )
    .then ( (res) => {
      this.setState({rubric: res.data});
    });
    console.log(this.state.rubric)
  }
  render() {
    return <div>Hello</div>;
  }
}
