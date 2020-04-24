import React from 'react';
import axios from 'axios';
import { Form, Button, Col, Row } from 'react-bootstrap';
const jsonWeb = require('jsonwebtoken');

class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tourneyId: this.props.match.params.tourneyId,
      uid: "",
      dbresults: {},
      dbtournresults: {},
      startTime: "",
      cycleTime: 0,
      numJudgeRooms: 0,
      numMatches: 0,
      numTables: 0,
      teams: [],
      droppedTeams: false,
      tableLayout: [],
      disabled: false,
      isAuthorized: false
    }

    this.handleSchedule = this.handleSchedule.bind(this);
    this.generatePDF = this.generatePDF.bind(this);
    this.randomizeTeams = this.randomizeTeams.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  async randomizeTeams() {
    var sched = new Array(this.state.teams.length).fill("");

    //populates each match shedule in robotSchedule
    for (var i = 0; i < sched.length; i++) {
      var j = Math.floor(Math.random() * sched.length);
      if (sched[j] !== "") {
        while (1) {
          j++;
          if (j === sched.length) {
            j = 0;
          }
          if (sched[j] === "") {
            sched[j] = this.state.teams[i];
            break;
          }
        }
      }
      else {
          sched[j] = this.state.teams[i];
      }
    }
    await this.setState({ teams: sched });
  }

  async handleChange(e) {
    e.preventDefault();
    await this.setState({tableLayout: []});
    await this.setState({disabled: false});
  }

  async handleDrop(e) {
    e.preventDefault();

    var exist = true;
    for (let index = 0; index < this.state.teams.length; index++) {
      if (this.state.teams[index].teamName === e.target.elements.teamDrops.value) {
        exist = false;
      }
    }
    if (exist) {
      alert("Error");
      return;
    }

    /*var sss = this.state.droppedTeams
    var inTeams = false
    var notInDroppedTeams = true
    for(let index = 0; index < this.state.teams.length; index++)
    {
        if(this.state.teams[index].teamName == e.target.elements.teamDrops.value)
        {
            inTeams = true
        }
    }
    for(let index = 0; index < this.state.droppedTeams.length; index++)
    {
        if(this.state.droppedTeams[index] == e.target.elements.teamDrops.value)
        {
            notInDroppedTeams = false
        }
    }
    if((inTeams == true) && (notInDroppedTeams == true))
    {
        sss.push(e.target.elements.teamDrops.value)
    }
    this.setState({droppedTeams: sss});

    console.log(this.state.droppedTeams)*/

    var temp = [];

    if (this.state.droppedTeams) {
      for (let index = 0; index < this.state.teams.length; index++) {
        if (this.state.teams[index].teamName !== e.target.elements.teamDrops.value && this.state.teams[index].teamName !== "NULL") {
          temp.push(this.state.teams[index]);
        }
      }
      await this.setState({ droppedTeams: false });
    }
    else {
      for (let index = 0; index < this.state.teams.length; index++) {
        if (this.state.teams[index].teamName === e.target.elements.teamDrops.value) {
          var t = this.state.teams[index];
          t.teamName = "NULL";
          temp.push(t);
        }
        else {
          temp.push(this.state.teams[index]);
        }
      }
      await this.setState({ droppedTeams: true });
    }
    await this.setState({ teams: temp });
  }

  async handleSchedule(e) {
    e.preventDefault();
    if (!e.target.elements.startTime.value || !e.target.elements.cycleTime.value) {
      alert("Please enter start time and cycle time");
      return;
    }

    var startTime = e.target.elements.startTime.value;
    var cycleTime = parseInt(e.target.elements.cycleTime.value, 10);
    var hour = parseInt(startTime.substring(0, startTime.indexOf(":")), 10);
    var min = parseInt(startTime.substring(startTime.indexOf(":") + 1), 10);

    //gets all teams in a tournament

    await axios.get(`/api/teams/tournid/${this.state.tourneyId}`)
    .then( async (result) => {
      if (this.state.teams.length === 0) {
        await this.setState({ teams: result.data });
      }
    })
    .catch((err) => {
      console.log(err);
    });

    //used to get number of matches in a tournament
    await axios.get(`/api/tournaments/${this.state.tourneyId}`)
    .then( async (result) => {
      await this.setState({ numMatches: result.data.matchesPerTeam });
      await this.setState({ numJudgeRooms: result.data.numJudgeRooms });
      await this.setState({ numTables: result.data.fieldsCount });
    })
    .catch((err) => {
      console.log(err);
    });


    var matchSchema = [];
    if (this.state.teams.length % 2 === 1) {
      await this.setState({droppedTeams: true});
      var arr = this.state.teams;
      var team = {
        teamName: "NULL"
      }
      arr.push(team);
    }
    var table = 1;
    this.randomizeTeams();
    for (var j = 0; j < this.state.numMatches; j++) {
      for (var i = 0; i < this.state.teams.length; i += 2) {
        var tempMin = "0" + min;
        var match = {
          match: j + 1,
          table: table,
          teamA: this.state.teams[i].teamName,
          teamB: this.state.teams[i + 1].teamName,
          startTime: hour + ":" + tempMin.substring(tempMin.length - 2)
        }

        min += cycleTime;
        if (min > 59) {
          min -= 60;
          hour++;
        }

        matchSchema.push(match);
        if (table === this.state.numTables) {
          table = 0;
        }
        table++;
      }
      this.randomizeTeams();
    }

    var tableArr = [];
    for (var k = 0; k < matchSchema.length; k += this.state.numTables) {
      var temp = [];
      for (var m = 0; m < this.state.numTables; m++) {
        if (!matchSchema[k + m]) {
          break;
        }
        temp.push(matchSchema[k + m]);
      }
      tableArr.push(temp);
    }

    await this.setState({ tableLayout: tableArr });
    await this.setState({ disabled: true });
    await this.setState({ startTime: startTime });
    await this.setState({ cycleTime: cycleTime });

    await axios.post(`/api/tournament/schedule`, {
      id: this.state.tourneyId,
      startTime: this.state.startTime,
      cycleTime: this.state.cycleTime,
      rawData: JSON.stringify(this.state),
      match: this.state.tableLayout
    })
    .catch(err => {
      console.log(err);
    })
  }

  async generatePDF() {
    await axios({
      method: 'get',
      url: `/api/tournaments/${this.state.tourneyId}/pdf`,
      responseType: 'blob'
    })
    .then(res => {
      const file = new Blob(
        [res.data],
        { type: 'application/pdf' }
      );

      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
    .catch(err => {
      console.log(err);
    });
  }

  async componentDidMount() {
    if (document.cookie.length) {
      var token = document.cookie.substring(13);
      var decoded = jsonWeb.verify(token, "123456");

      await this.setState({
        dbresults: decoded,
        uid: decoded.auth0id
      });
    }

    await axios.get(`/api/tournaments/${this.state.tourneyId}`)
    .then( async (res) => {
      await this.setState({
        dbtournresults: res.data
      });
    })
    .catch((error) => {
      console.log(error);
    });

    await axios.get(`/api/tournaments/schedule/${this.state.tourneyId}`)
    .then( async (result) => {
      var stat = JSON.parse(result.data.rawData);
      await this.setState(stat);
      console.log(this.state);
    })
    .catch( (err) => {
      console.log(err);
    });

    if (this.state.dbtournresults.director === this.state.dbresults._id) {
      await this.setState({
        isAuthorized: true
      });
    }
  }

  render() {
    return (
      <div data-test="theSchedule" className="pl-3 pr-3 pt-2">
        <h1 className="pb-2">Generate Schedule for Tournament "{this.state.dbtournresults.name}"</h1>
        {this.state.isAuthorized && (
          <div>
            {!this.state.disabled && (
            <Form onSubmit={this.handleSchedule}>
              <Row className="pb-2">
                <Col xs="2">
                  <Form.Group controlId="startTime">
                    <Form.Control type="text" placeholder="Start Time (hh:mm)" />
                  </Form.Group>
                </Col>
                <Col xs="2">
                  <Form.Group controlId="cycleTime">
                    <Form.Control type="text" placeholder="Cycle Time (mm)" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Button type="submit">Generate Schedule</Button>
              </Form.Group>
            </Form>
            )}

            <Form>
              {this.state.tableLayout.map((sched, index) => (
                <Form.Group>
                <Row>
                {sched.map((robot, ind) => (
                  <Col className="mb-2" xs = "4">
                    {!index && (
                      <h5>Table {ind + 1}</h5>
                    )}
                    <Form.Control type="text" value={robot.startTime + " " + robot.teamA + " | " + robot.teamB } readOnly={true} />
                  </Col>
                ))}
                </Row>
                </Form.Group>
              ))}
            </Form>

            {this.state.disabled && (
              <Form onSubmit={this.handleChange}>
                <Form.Group>
                  <Button variant="danger" type="submit">Generate New Schedule</Button>
                </Form.Group>
              </Form>
            )}

            {this.state.disabled && (
              <Form onSubmit={this.handleDrop}>
                <hr/>
                <h3 className="pb-1">Drop Team from Schedule</h3>
                <div className="pb-1">
                  <Form.Group data-test="aCommentInput" controlId="teamDrops">
                    <Form.Label>Team Name</Form.Label>
                    <Form.Control as="input"/>
                  </Form.Group>
                </div>
                <Button type="submit">
                  Drop Team
                </Button>
                <hr />
              </Form>
            )}
            <Button onClick={this.generatePDF}>Generate PDF</Button>
          </div>
        )}
        {!this.state.isAuthorized && (
          <h3>You are not authorized to generate schedule in this tournament.</h3>
        )}
      </div>
    );
  }
}

export default Schedule;
