import React, {Component} from 'react';
import {Form, Button, Col, Row, DropdownButton, Dropdown} from 'react-bootstrap';
import axios from 'axios';

export default class ModifySchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourneyId: this.props.match.params.tourneyId,
      schedule: {}
    }

    this.handleSwitch = this.handleSwitch.bind(this);
  }

  findTeams(teamA, teamB, match) {
    var array = this.state.schedule.tableLayout;
    var ret = new Array(2).fill(0);
    var a = false;
    var b = false;
    for(var i = 0; i < array.length; i++) {
      for(var j = 0; j < array[i].length; j++) {
        if(array[i][j].teamA === teamA || array[i][j].teamB === teamA) {
          ret[0] = array[i][j].table
          a = true;
        }
        if(array[i][j].teamA === teamB || array[i][j].teamB === teamB) {
          ret[1] = array[i][j].table
          b = true;
        }
        if(a && b) {
          break;
        }
      }
      if(a && b) {
        break;
      }
    }
    return ret;
  }

  async handleSwitch(e) {
    e.preventDefault();

    if(!e.target.elements.teamA.value || !e.target.elements.teamB.value) {
      alert("Please enter both Team A and Team B");
      return;
    }

    var teamA = e.target.elements.teamA.value;
    var teamB = e.target.elements.teamB.value;
    var match = e.target.elements.match.value;

    var a = false;
    var b = false;
    var array = this.state.schedule.teams;

    for(var i = 0; i < array.length; i++) {
      if(a && b) {
        break;
      }
      if(array[i].teamName === teamA) {
        a = true;
      }
      if(array[i].teamName === teamB) {
        b = true;
      }
    }

    if(!a) {
      alert(teamA + " is not a team in tournament");
      return;
    }

    if(!b) {
      alert(teamB + " is not a team in tournament");
      return;
    }

    var ans = this.findTeams(teamA, teamB, match);
    console.log(ans);
    
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSwitch}>
          <Row>
            <Col>
              <Form.Group controlId="teamA">
                <Form.Control type="text" placeholder="Team A" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="teamB">
                <Form.Control type="text" placeholder="Team B" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="match">
                <Form.Control type="text" placeholder="match" />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="outline-primary" type="submit">Switch Teams</Button>
        </Form>
      </div>
    );
  }

  async componentDidMount() {
    await axios.get(`/api/tournaments/schedule/${this.state.tourneyId}`).then(result => {
      this.setState({schedule: JSON.parse(result.data[0].rawData)});
      console.log(this.state);
    }).catch(err => {
      console.log(err);
    })
  }
  
}