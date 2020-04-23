import React, {Component} from 'react';
import {Form, Button, Col, Row} from 'react-bootstrap';
import axios from 'axios';

export default class ModifySchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourneyId: this.props.match.params.tourneyId,
      schedule: {}
    }

    this.handleSwitch = this.handleSwitch.bind(this);
    this.moveBackTime = this.moveBackTime.bind(this);
  }

  findTeams(teamA, teamB, match) {
    var array = this.state.schedule.tableLayout;
    var temp = parseInt(match, 10);
    var ret = new Array(4).fill(0);
    var a = false;
    var b = false;
    for(var i = 0; i < array.length; i++) {
      for(var j = 0; j < array[i].length; j++) {
        if((array[i][j].teamA === teamA || array[i][j].teamB === teamA) && array[i][j].match === temp) {
          ret[0] = i;
          ret[1] = j;
          a = true;
        }
        if((array[i][j].teamA === teamB || array[i][j].teamB === teamB) && array[i][j].match === temp) {
          ret[2] = i;
          ret[3] = j;
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

    var tabArray = this.state.schedule.tableLayout;

    if(tabArray[ans[0]][ans[1]].teamA === teamA) {
      tabArray[ans[0]][ans[1]].teamA = teamB;
    } else {
      tabArray[ans[0]][ans[1]].teamB = teamB;
    }

    if(tabArray[ans[2]][ans[3]].teamA === teamB) {
      tabArray[ans[2]][ans[3]].teamA = teamA;
    } else {
      tabArray[ans[2]][ans[3]].teamB = teamA;
    }

    this.setState({tableLayout: tabArray});
    console.log(this.state);

    var match2 = [];
    for(var k = 0; k < tabArray.length; k++) {
      for(var m = 0; m < tabArray[k].length; m++) {
        match2.push(tabArray[k][m]);
      }
    }

    await axios.patch(`/api/tournament/${this.state.tourneyId}/schedule`, {
      rawData: JSON.stringify(this.state.schedule),
      match: match2
    }).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
    
  }

  async moveBackTime(e){
    e.preventDefault();

    if(!e.target.elements.oldTime.value || !e.target.elements.newTime.value) {
      alert("Please enter old time and new time");
      return;
    }

    var sched = this.state.schedule;

    var array = this.state.schedule.tableLayout;
    var oldTime = e.target.elements.oldTime.value;
    var newTime = e.target.elements.newTime.value;
    var cycleTime = this.state.schedule.cycleTime;

    if(parseInt(newTime.substring(0, newTime.indexOf(":")), 10) < parseInt(oldTime.substring(0, oldTime.indexOf(":")), 10)) {
      alert("Not a valid new time.");
      return;
    }

    if(parseInt(newTime.substring(0, newTime.indexOf(":")), 10) === parseInt(oldTime.substring(0, oldTime.indexOf(":")), 10)) {
      if(parseInt(newTime.substring(newTime.length - 2), 10) < parseInt(oldTime.substring(oldTime.length - 2), 10)) {
        alert("Not a valid new time");
      }
    }

    var i = 0;
    var j = 0;
    var isHere = false;
    for(i = 0; i < array.length; i++) {
      for(j = 0; j < array[i].length; j++) {
        if(array[i][j].startTime === oldTime) {
          isHere = true;
          break;
        }
      }
      if(isHere) {
        break;
      }
    }

    if(!isHere) {
      alert("Match/Table does not exist");
      return;
    }

    if(i === 0 && j === 0) {
      sched.startTime = newTime;
    }

    var min = parseInt(newTime.substring(newTime.length-2), 10);
    var hour = parseInt(newTime.substring(0, newTime.indexOf(":")));

    for(var n = i; n < array.length; n++) {
      for(var p = j; p < array[n].length; p++) {
        j = 0;
        var tempMin = "0" + min;
        array[n][p].startTime = hour + ":" + tempMin.substring(tempMin.length - 2);
        min += cycleTime;
        if(min > 59) {
          min -= 60;
          hour++;
        }
      }
    }

    sched.tableLayout = array;

    var match = [];
    for(var k = 0; k < array.length; k++) {
      for(var m = 0; m < array[k].length; m++) {
        match.push(array[k][m]);
      }
    }

    this.setState({schedule: sched});

    await axios.patch(`/api/tournament/${this.state.tourneyId}/schedule`, {
      rawData: JSON.stringify(this.state.schedule),
      match: match,
      startTime: this.state.schedule.startTime
    }).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });


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
                <Form.Control type="text" placeholder="Match Number" />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Button variant="outline-primary" type="submit">Switch Teams</Button>
          </Form.Group>
        </Form>
        <Form onSubmit={this.moveBackTime}>
          <Row>
            <Col>
              <Form.Group controlId="oldTime">
                <Form.Control type="text" placeholder="Original Start Time" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="newTime">
                <Form.Control type="text" placeholder="New Start Time" />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Button variant="outline-primary" type="submit">Change Match Time</Button>
          </Form.Group>
        </Form>
      </div>
    );
  }

  async componentDidMount() {
    await axios.get(`/api/tournaments/schedule/${this.state.tourneyId}`).then(result => {
      this.setState({schedule: JSON.parse(result.data.rawData)});
      console.log(this.state);
    }).catch(err => {
      console.log(err);
    })
  }  
}