import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

class QuickLinks extends Component {
  render() {
    return(
      <div className="pl-3 pr-3 pt-2">
        <h1>Quick Links</h1>
        <ListGroup>
          <ListGroup.Item action target="_blank" rel="noopener noreferrer" href="https://www.firstinspires.org/robotics/fll">FLL Homepage</ListGroup.Item>
          <ListGroup.Item action target="_blank" rel="noopener noreferrer" href="https://www.firstinspires.org/robotics/fll/challenge-and-season-info">FLL Challenge & Season Info</ListGroup.Item>
          <ListGroup.Item action target="_blank" rel="noopener noreferrer" href="https://www.firstinspires.org/resource-library?flagged=All&combine=&field_content_type_value%5B%5D=first_lego_league&field_resource_library_tags_tid=All&field_resource_library_tags_tid=All&sort_by=created_1">FLL Resource Library</ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default QuickLinks;
