import React, { Component } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'
import jsonWeb from 'jsonwebtoken';

export default class TournamentDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tourneyId: this.props.match.params.tourneyId,
      uid: "",
      dbresults: {},
      dbtournresults: {},
      dbnames: {
        director: "",
        headReferees: [],
        judgeAdvisors: [],
        referees: [],
        judges: [],
        viewOnlyVols: [],
        teams: []
      },
      setRefereeAuthorized: false,
      rubricEntryAuthorized: false,
      createTeamAuthorized: false,
      viewRubricsAuthorized: false,
      scoresheetsAuthorized: false
    }

    this.updateState = this.updateState.bind(this);
    this.handleRubricEntry = this.handleRubricEntry.bind(this);
  }

  handleRubricEntry(e) {
    e.preventDefault();
    window.location = "/rubricentry/" + this.state.tourneyId + "/" + e.target.elements.formRubricEntry.value;
  }

  async updateState() {
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

    await axios.get(`/api/users/${this.state.dbtournresults.director}`)
    .then( (res) => {
      this.state.dbnames.director = res.data.name;
    })
    .catch( (err) => {
      console.log(err);
    });
    await this.setState(this.state);
    this.state.dbtournresults.headReferee.forEach( async (item, i) => {
      await axios.get(`/api/users/${item}`)
      .then( (res) => {
        this.state.dbnames.headReferees[i] = res.data.name;
      })
      .catch( (err) => {
        console.log(err);
      });
      await this.setState(this.state);
    });
    this.state.dbtournresults.judgeAdvisor.forEach( async (item, i) => {
      await axios.get(`/api/users/${item}`)
      .then( (res) => {
        this.state.dbnames.judgeAdvisors[i] = res.data.name;
      })
      .catch( (err) => {
        console.log(err);
      });
      await this.setState(this.state);
    });
    this.state.dbtournresults.judges.forEach( async (item, i) => {
      await axios.get(`/api/users/${item}`)
      .then( (res) => {
        this.state.dbnames.judges[i] = res.data.name;
      })
      .catch( (err) => {
        console.log(err);
      });
      await this.setState(this.state);
    });
    this.state.dbtournresults.referees.forEach( async (item, i) => {
      await axios.get(`/api/users/${item}`)
      .then( (res) => {
        this.state.dbnames.referees[i] = res.data.name;
      })
      .catch( (err) => {
        console.log(err);
      });
      await this.setState(this.state);
    });
    this.state.dbtournresults.viewOnlyVols.forEach( async (item, i) => {
      await axios.get(`/api/users/${item}`)
      .then( (res) => {
        this.state.dbnames.viewOnlyVols[i] = res.data.name;
      })
      .catch( (err) => {
        console.log(err);
      });
      await this.setState(this.state);
    });
    this.state.dbtournresults.teams.forEach( async (item, i) => {
      await axios.get(`/api/teams/${item}`)
      .then( (res) => {
        this.state.dbnames.teams[i] = res.data.teamName;
      })
      .catch( (err) => {
        console.log(err);
      });
      await this.setState(this.state);
    });

    if (this.state.dbtournresults.director === this.state.dbresults._id) {
      await this.setState({
        rubricEntryAuthorized: true,
        createTeamAuthorized: true,
        viewRubricsAuthorized: true,
        setRefereeAuthorized: true,
        scoresheetsAuthorized: true
      });
    }
    if (this.state.dbtournresults.judgeAdvisor.includes(this.state.dbresults._id)) {
      await this.setState({
        rubricEntryAuthorized: true,
        viewRubricsAuthorized: true
      });
    }
    if (this.state.dbtournresults.judges.includes(this.state.dbresults._id)) {
      await this.setState({
        rubricEntryAuthorized: true
      });
    }
    if (this.state.dbtournresults.headReferee.includes(this.state.dbresults._id)) {
      await this.setState({
        setRefereeAuthorized: true,
        scoresheetsAuthorized: true
      });
    }
    if (this.state.dbtournresults.referees.includes(this.state.dbresults._id)) {
      await this.setState({
        scoresheetsAuthorized: true
      });
    }
  }

  async componentDidMount() {
    await this.updateState();
    console.log("INITIAL TOURNAMENT DASHBOARD STATE", this.state);
  }

  render() {
    return (
      <Container style={{paddingLeft: 0, marginLeft: 0}}>
        <Row>
          <Col style={{background: "#868e96", height: "100vh"}}>
            <div className="pl-3 pt-2">
              <h1>{this.state.dbtournresults.name}</h1>
              <hr />
              <h3>{new Date(this.state.dbtournresults.startDate).toLocaleDateString()} - {new Date(this.state.dbtournresults.endDate).toLocaleDateString()}</h3>
              <hr />
              <h6>Matches/Team: {this.state.dbtournresults.matchesPerTeam}</h6>
              <h6>Tables: {this.state.dbtournresults.fieldsCount}</h6>
              <h6>Judging Rooms: {this.state.dbtournresults.numJudgeRooms}</h6>
              <hr />
              <h6><strong>Director:</strong> {this.state.dbnames.director}</h6>
              <h6><strong>Head Referee(s): </strong>
                {this.state.dbnames.headReferees.map( (item, i) => {
                  if (i === this.state.dbnames.headReferees.length - 1) {
                    return(item);
                  }
                  else {
                    return(`${item}, `);
                  }
                })}
              </h6>
              <h6><strong>Judge Advisor(s): </strong>
                {this.state.dbnames.judgeAdvisors.map( (item, i) => {
                  if (i === this.state.dbnames.judgeAdvisors.length - 1) {
                    return(item);
                  }
                  else {
                    return(`${item}, `);
                  }
                })}
              </h6>
              <h6><strong>Referee(s): </strong>
                {this.state.dbnames.referees.map( (item, i) => {
                  if (i === this.state.dbnames.referees.length - 1) {
                    return(item);
                  }
                  else {
                    return(`${item}, `);
                  }
                })}
              </h6>
              <h6><strong>Judge(s): </strong>
                {this.state.dbnames.judges.map( (item, i) => {
                  if (i === this.state.dbnames.judges.length - 1) {
                    return(item);
                  }
                  else {
                    return(`${item}, `);
                  }
                })}
              </h6>
              <h6><strong>View-Only Volunteer(s): </strong>
                {this.state.dbnames.viewOnlyVols.map( (item, i) => {
                  if (i === this.state.dbnames.viewOnlyVols.length - 1) {
                    return(item);
                  }
                  else {
                    return(`${item}, `);
                  }
                })}
              </h6>
              <h6><strong>Team Names: </strong>
                {this.state.dbnames.teams.map( (item, i) => {
                  if (i === this.state.dbnames.teams.length - 1) {
                    return(item);
                  }
                  else {
                    return(`${item}, `);
                  }
                })}
              </h6>
            </div>
          </Col>
          <Col className="pl-3 pt-2">
            <div>
              <h3 className="pb-1">User Management</h3>
              <Link className="pl-1 pr-1" to={"/setreferee/" + this.state.tourneyId}>
                <Button className="mb-1" disabled={!this.state.setRefereeAuthorized}>Set Referees</Button>
              </Link>
              <Link className="pl-1 pr-1" to={"/createjudge/" + this.state.tourneyId}>
                <Button className="mb-1" disabled={!this.state.viewRubricsAuthorized}>Set Judges</Button>
              </Link>
              <Link className="pl-1 pr-1" to={"/createteam/" + this.state.tourneyId}>
                <Button className="mb-1" disabled={!this.state.createTeamAuthorized}>Create Team</Button>
              </Link>
              <hr />
            </div>
            <div>
              <h3 className="pb-1">Rubric Entry</h3>
              <Form className="pl-1" onSubmit={this.handleRubricEntry}>
                <Form.Group controlId="formRubricEntry">
                  <Form.Label>Select a team:</Form.Label>
                  <Form.Control disabled={!this.state.rubricEntryAuthorized} required as="select">
                    <option></option>
                    {this.state.dbtournresults.teams && this.state.dbtournresults.teams.map( (item, i) => {
                      return (
                        <option value={item}>{this.state.dbnames.teams[i]}</option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
                <Button disabled={!this.state.rubricEntryAuthorized} type="submit">Go</Button>
              </Form>
              <hr />
            </div>
            <div>
              <h3 className="pb-1">Rubric & Score Management</h3>
              <Link className="pl-1 pr-1" to={"/viewrubrics/" + this.state.tourneyId}>
                <Button className="mb-1" disabled={!this.state.viewRubricsAuthorized}>View Rubrics</Button>
              </Link>
              <Link className="pl-1 pr-1" to={"/t/" + this.state.tourneyId + "/mscores"}>
                <Button className="mb-1" disabled={!this.state.setRefereeAuthorized}>View Match Scores</Button>
              </Link>
              <Link className="pl-1 pr-1" to={"/matchranking/" + this.state.tourneyId}>
                <Button className="mb-1">See Tournament Rankings</Button>
              </Link>
              <Link className="pl-1 pr-1" to={"/createscoresheet/" + this.state.tourneyId}>
                <Button className="mb-1" disabled={!this.state.scoresheetsAuthorized}>Create Scoresheet</Button>
              </Link>
              {this.state.tournamentDirector && (
                <Link to={"/tournamentschedule/" + this.state.tourneyId}>
                    <Button>Schedule</Button>
                </Link>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
