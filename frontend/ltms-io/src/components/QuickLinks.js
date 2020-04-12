import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
const jsonWeb = require('jsonwebtoken');

class QuickLinks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      dbresults: {}
    };
  }

  render() {
    return(
      <div>
        <h1>Quick Links</h1>
        <ListGroup>
          <ListGroup.Item><a target="_blank" href="https://www.firstinspires.org/robotics/fll">FLL Homepage</a></ListGroup.Item>
          <ListGroup.Item><a target="_blank" href="https://www.firstinspires.org/robotics/fll/challenge-and-season-info">FLL Challenge & Season Info</a></ListGroup.Item>
          <ListGroup.Item><a target="_blank" href="https://www.firstinspires.org/resource-library?flagged=All&combine=&field_content_type_value%5B%5D=first_lego_league&field_resource_library_tags_tid=All&field_resource_library_tags_tid=All&sort_by=created_1">FLL Resource Library</a></ListGroup.Item>
        </ListGroup>
      </div>
    );
  }

  async componentDidMount() {
    if (document.cookie.length) {
      var token = document.cookie.substring(13);
      var decoded = jsonWeb.verify(token, "123456");

      this.state.dbresults = decoded;
      this.state.uid = decoded.auth0id;
    }
    this.setState(this.state);

    console.log("INITIAL QUICKLINKS STATE", this.state);
  }
}

export default QuickLinks;
