import React, { Component } from 'react'
import axios from 'axios';
import { Row, Col, Container, Button, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import { Pacman } from 'react-pure-loaders';
import LoadingOverlay from 'react-loading-overlay';
const jsonWeb = require('jsonwebtoken');

export default class EditScoreEntry extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tourneyId: this.props.match.params.tourneyId,
      scoreId: this.props.match.params.scoreId,
      uid: "",
      dbresults: {},
      dbtournresults: {},
      scoreResults: {},
      rawData: [],
      events: [],
      insertIdx: 0,
      finalscore: 0,
      notesBox: "",
      isAuthorized: false,
      uploading: false
    }

    this.handleInsert = this.handleInsert.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.notesUpdate = this.notesUpdate.bind(this);
  }

  async handleInsert(name, type) {
    var newArray = [...this.state.events];
    var cate = name;
    var score;
    var eventKey = name.charAt(0);

    if (type === "Yes/No") {
      score = <div>
          <Dropdown.Item key="yes" eventKey={"y" + eventKey}>Yes</Dropdown.Item>
          <Dropdown.Item key="no" eventKey={"n" + eventKey}>No</Dropdown.Item>
      </div>
    }
    else {
      score = <div>
          <Dropdown.Item key="1" eventKey={"1" + eventKey}>1</Dropdown.Item>
          <Dropdown.Item key="2" eventKey={"2" + eventKey}>2</Dropdown.Item>
          <Dropdown.Item key="3" eventKey={"3" + eventKey}>3</Dropdown.Item>
          <Dropdown.Item key="4" eventKey={"4" + eventKey}>4</Dropdown.Item>
          <Dropdown.Item key="5" eventKey={"5" + eventKey}>5</Dropdown.Item>
      </div>
    }

    newArray.push({
      categ: <Form.Control type="text" defaultValue={cate} disabled />,
      scoretype: score,
      tempScore: this.state.scoreResults.fieldValues[this.state.insertIdx]
    })

    var newIdx = this.state.insertIdx + 1;
    await this.setState({
      events: newArray,
      insertIdx: newIdx
    });
  }

  async handleChange(eventKey) {
    var newArray = [...this.state.events];

    if (eventKey.substring(0, 1) === "y" || eventKey.substring(0, 1) === "n") {
      if (eventKey.substring(0, 1) === "y") {
        newArray[parseInt(eventKey.substring(1), 10) - 1].tempScore = "Yes";
      }
      else {
        newArray[parseInt(eventKey.substring(1), 10) - 1].tempScore = "No";
      }
    }
    else {
      newArray[parseInt(eventKey.substring(1), 10) - 1].tempScore = eventKey.substring(0, 1);
    }

    await this.setState({ events: newArray });
  }

  async handleUpdate(e) {
    e.preventDefault();
    e.persist()
    await this.setState({
      uploading: true
    });

    var index = this.state.events.length;
    var score = 0;

    for (var i = 0; i < index; i++) {
      if (this.state.events[i].tempScore === "Yes") {
        score += 5;
      }
      else if (this.state.events[i].tempScore === "No") {
        continue;
      }
      else {
        score += parseInt(this.state.events[i].tempScore, 10);
      }
    }

    await this.setState({ finalscore: score });

    var fixedCats = [];
    var fixedScores = [];
    this.state.events.forEach( (event) => {
      fixedCats.push(event.categ.props.defaultValue);
      fixedScores.push(event.tempScore);
    });

    await this.setState({notesBox: this.state.notesBox + ` [Change to final score: ${score - this.state.scoreResults.finalScore}]`});
    axios.patch(`/api/tournaments/${this.state.tourneyId}/scores/${this.state.scoreId}`, {
      fieldTypes: fixedCats,
      fieldValues: fixedScores,
      teamNum: this.state.team,
      scoreType: "match",
      finalScore: score,
      rawData: JSON.stringify(this.state.events),
      changeNotes: this.state.notesBox
    })
    .then( async (res) => {
      await this.setState({
        uploading: false
      });
      window.location = '/tournamentdashboard/' + this.state.tourneyId;
    })
    .catch( (err) => {
      console.log(err);
    })
  }

  async notesUpdate(e) {
    e.preventDefault();

    await this.setState({
      notesBox: e.target.value
    });
  }

  async componentDidMount() {
    await this.updateState();
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
    .then( async (result) => {
      await this.setState({
        dbtournresults: result.data
      });
    })
    .catch( (error) => {
      console.log(error);
    });

    await axios.get(`/api/tournaments/${this.state.tourneyId}/scores/${this.state.scoreId}`)
    .then( async (result) => {
      await this.setState({scoreResults: result.data});
      await this.setState({rawData: JSON.parse(result.data.rawData)});
      console.log(this.state);
      this.state.rawData.forEach(item => {
          this.handleInsert(item.categ.props.defaultValue, item.explicitType);
      });
    })
    .catch( (error) => {
      console.log(error);
    });

    if (this.state.dbtournresults.headReferee.includes(this.state.dbresults._id) ||
        this.state.dbtournresults.director === this.state.dbresults._id) {
      await this.setState({
        isAuthorized: true
      })
    }

    console.log("UPDATED STATE")
    console.log(this.state);
  }

  render() {
    return (
      <LoadingOverlay active={this.state.uploading} spinner={<Pacman loading color="black" />} text='Loading...' >
        <div className="pl-3 pr-3 pt-2">
          <h1 className="text-center">Edit Score for Match ID "{this.state.scoreId}" in Tournament "{this.state.dbtournresults.name}"</h1>
          {this.state.isAuthorized && (
            <div>
              <h3 className="text-center">Score Type: {this.state.scoreResults.scoreType}</h3>

              <Container>
                <Form>
                  {this.state.rawData &&
                    this.state.events.map((event, i) => (
                      <Row key={i}>
                        <Col>
                          <Form.Group controlId="category">
                            {event.categ}
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="score">
                            <DropdownButton title={event.tempScore} onSelect={this.handleChange}>
                              {event.scoretype}
                            </DropdownButton>
                          </Form.Group>
                        </Col>
                      </Row>
                    ))}
                  <hr />
                  <Row>
                    <Col>
                      <h5>Notes</h5>
                      <ul>
                        {this.state.scoreResults.changeNotes &&
                          this.state.scoreResults.changeNotes.map((item, i) => {
                            return (
                              <li key={i}>
                                {item}
                              </li>
                            );
                          })
                        }
                      </ul>
                      <Form.Group controlId="notes">
                        <Form.Control as="textarea" onChange={this.notesUpdate}/>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
                <Button onClick={this.handleUpdate}>
                  Submit Changes
                </Button>
              </Container>
            </div>
          )}
          {!this.state.isAuthorized && (
            <h3>You are not authorized to edit score in this tournament.</h3>
          )}
        </div>
      </LoadingOverlay>
    )
  }
}
