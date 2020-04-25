import React from 'react';
import {Form, Button, Col, Row, DropdownButton, Dropdown} from 'react-bootstrap';
import axios from 'axios';
import { Pacman } from 'react-pure-loaders';
import LoadingOverlay from 'react-loading-overlay';
const jsonWeb = require('jsonwebtoken');

class Sheet extends React.Component{

  //Constructor sets up the state variable
  constructor(props){
    super(props);
    this.state = {
      tourneyId: this.props.match.params.tourneyId,
      uid: "",
      dbresults: {},
      dbtournresults: {},
      modal: false,
      team: 0,
      readOnly: false,
      events: [],
      runningScore: 0,
      finalscore: 0,
      scoreType: "Score Type",
      index: 0,
      category: "Category",
      isAuthorized: false,
      disabled: false,
      uploading: false
    }

    //binds the fuction
    this.handleInsert = this.handleInsert.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.handleScoreSelect = this.handleScoreSelect.bind(this);
    this.handleTeam = this.handleTeam.bind(this);
    this.changeTeam = this.changeTeam.bind(this);
    this.autoPopulate = this.autoPopulate.bind(this);
    this.handleCatChange = this.handleCatChange.bind(this);

  }

  autoPopulate(e) {
    e.preventDefault();

    axios.get(`/api/tournaments/5ea207a2b67532364020b8e0/scores/5ea21339b67532364020b8e2`).then(result => {
      var event = JSON.parse(result.data.rawData);
      var newArray = [];
      for(var i = 0; i < event.length; i++) {
        var score;
        if(event[i].explicitType === "Yes/No"){
          score = <div>
                    <Dropdown.Item key="yes" eventKey={"y" + i}>Yes</Dropdown.Item>
                    <Dropdown.Item key="no" eventKey={"n" + i}>No</Dropdown.Item>
                  </div>
        }else{
          score = <div>
                    <Dropdown.Item key="1" eventKey={"1" + i}>1</Dropdown.Item>
                    <Dropdown.Item key="2" eventKey={"2" + i}>2</Dropdown.Item>
                    <Dropdown.Item key="3" eventKey={"3" + i}>3</Dropdown.Item>
                    <Dropdown.Item key="4" eventKey={"4" + i}>4</Dropdown.Item>
                    <Dropdown.Item key="5" eventKey={"5" + i}>5</Dropdown.Item>
                  </div>
        }
        var cate = event[i].categ.props.value
        newArray.push({
          categ: <Form.Control type = "text" name={"text" + i} eventkey={"text" + i} defaultValue = {cate} readOnly={false} onChange={this.handleCatChange}/>,
          scoretype: score,
          tempScore: "Score",
          explicitType: event[i].explicitType
        })
      }

      var index = newArray.length;
      this.setState({index: index});
      this.setState({events: newArray});
      this.setState({disabled: true});
    }).catch(err => {
      console.log(err);
    })
  }

  async handleScoreSelect(eventKey) {
    if (eventKey === "yes") {
      await this.setState({scoreType: "Yes/No"});
    }
    else {
      await this.setState({scoreType: "1-5"});
    }
  }

  handleCatChange(eventKey) {
    var array = this.state.events;
    var index = parseInt(eventKey.target.name.substring(4), 10);
    array[index].categ = <Form.Control type = "text" name={"text" + index} eventkey={"text" + index} defaultValue = {eventKey.target.value} readOnly={false} onChange={this.handleCatChange}/>;
    this.setState({events: array});
    console.log(this.state);
  }

  //function to allow edits to team scored
  async changeTeam(e) {
    await this.setState({readOnly: false});
  }

  //function saves the team being scored
  async handleTeam(e) {
    e.preventDefault();
    if(e.target.elements.teamName.value !== ""){
      await this.setState({team: e.target.elements.teamName.value});
      await this.setState({readOnly: true});
    }
  }

  //function to handle the calculate score call
  async handleInsert(e) {
    e.preventDefault()
    if (e.target.elements.category.value === "") {
      return;
    }
    if (this.state.scoreType === "Score Type") {
      return;
    }

    var newArray = [...this.state.events];
    var cate = (this.state.index+1).toString() + ". " + e.target.elements.category.value;
    e.target.reset();
    var score;
    var eventKey = (this.state.index).toString();

    if (this.state.scoreType === "Yes/No") {
      score = <div>
                <Dropdown.Item key="yes" eventKey={"y"+eventKey}>Yes</Dropdown.Item>
                <Dropdown.Item key="no" eventKey={"n"+eventKey}>No</Dropdown.Item>
              </div>
    }
    else{
      score = <div>
                <Dropdown.Item key="1" eventKey={"1"+eventKey}>1</Dropdown.Item>
                <Dropdown.Item key="2" eventKey={"2"+eventKey}>2</Dropdown.Item>
                <Dropdown.Item key="3" eventKey={"3"+eventKey}>3</Dropdown.Item>
                <Dropdown.Item key="4" eventKey={"4"+eventKey}>4</Dropdown.Item>
                <Dropdown.Item key="5" eventKey={"5"+eventKey}>5</Dropdown.Item>
              </div>
    }

    newArray.push({
      categ: <Form.Control type = "text" name={"text" + this.state.index} eventkey = {"text" + this.state.index} defaultValue = {cate} onChange={this.handleCatChange}/>,
      scoretype: score,
      tempScore: "Score",
      explicitType: this.state.scoreType
    })

    this.setState({events: newArray});
    var index = this.state.index + 1;
    this.setState({index: index});
    this.setState({scoreType: "Score Type"})
    this.setState({disabled: true});
  }

  //function to save the score type for a specific category
  async handleChange(eventKey){
    console.log(this.state.events[parseInt(eventKey.substring(1), 10)].tempScore);
    console.log(eventKey);
    var newArray = [...this.state.events];

    if (eventKey.substring(0,1) === "y" || eventKey.substring(0,1) === "n") {
      if (eventKey.substring(0,1) === "y") {
        newArray[parseInt(eventKey.substring(1), 10)].tempScore = "Yes";
      }
      else {
        newArray[parseInt(eventKey.substring(1), 10)].tempScore = "No";
      }
    }
    else {
      newArray[parseInt(eventKey.substring(1), 10)].tempScore = eventKey.substring(0,1);
    }

    await this.setState({events: newArray});
  }

  //function to calculate team score
  async handleCalculate(e){
    e.preventDefault();
    e.persist()
    await this.setState({
      uploading: true
    });

    if (this.state.readOnly === false) {
      alert("Please set the team being scored");
      return;
    }

    var index = this.state.index;
    var score = 0;

    for (var i = 0; i < index; i++) {
      if (this.state.events[i].tempScore === "Yes") {
        score += 5;
      }
      else if (this.state.events[i].tempScore === "No") {
        continue;
      }
      else{
        if (this.state.events[i].tempScore === "Score") {
          continue;
        }
        score += parseInt(this.state.events[i].tempScore, 10);
      }
    }

    await this.setState({finalscore: score});

    var fixedCats = [];
    var fixedScores = [];
    this.state.events.forEach( (event) => {
      fixedCats.push(event.categ.props.defaultValue);
      fixedScores.push(event.tempScore);
    });

    await axios.post("/api/tournaments/score", {
      id: this.state.tourneyId,
      fieldTypes: fixedCats,
      fieldValues: fixedScores,
      teamNum: this.state.team,
      scoreType: "match",
      finalScore: score,
      rawData: JSON.stringify(this.state.events)
    })
    .then( async () => {
      await this.setState({
        uploading: false
      });
    })
    .catch( (err) => {
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
    .then( async (result) => {
      await this.setState({
        dbtournresults: result.data
      });
    }).catch( (error) => {
      console.log(error);
    });

    if (this.state.dbtournresults.director === this.state.dbresults._id ||
        this.state.dbtournresults.headReferee.includes(this.state.dbresults._id) ||
        this.state.dbtournresults.referees.includes(this.state.dbresults._id)) {
      await this.setState({
        isAuthorized: true
      });
    }

    console.log("INITIAL VIEW RUBRICS STATE", this.state);
  }

  //render function
  render(){
    return(
      <LoadingOverlay active={this.state.uploading} spinner={<Pacman loading color="black" />} text='Loading...' >
        <div data-test="theScoresheet" className="pl-3 pr-3 pt-2">
          <h1>Create Scoresheet for Tournament "{this.state.dbtournresults.name}"</h1>
          {this.state.isAuthorized && (
            <div>
              <h3>Enter Team #</h3>
              <div className="pb-2">
                <Form onSubmit={this.handleTeam}>
                  <Form.Group controlId="teamName">
                    <Form.Control type="text" placeholder="Enter the team's number" readOnly={this.state.readOnly}/>
                  </Form.Group>
                  <Button className="mr-1" type="submit">
                    Set Team
                  </Button>
                  <Button className="ml-1" variant="danger" onClick={this.changeTeam}>
                    Change Team
                  </Button>
                </Form>
              </div>
              <hr />
              <div className="pb-2">
                <Form onSubmit={this.handleInsert}>
                  <h3 className="pb-1">Add Categories</h3>
                  <Button className="mb-3" onClick={this.autoPopulate}>
                    Auto-Populate
                  </Button>
                  <Row>
                    <Col>
                      <Form.Group controlId = "category">
                        <Form.Control type = "text" placeholder = "Enter the category's name"/>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId = "score">
                        <DropdownButton title={this.state.scoreType} onSelect={this.handleScoreSelect}>
                          <Dropdown.Item key="yes" eventKey="yes">Yes/No</Dropdown.Item>
                          <Dropdown.Item key="15" eventKey="15">1-5</Dropdown.Item>
                        </DropdownButton>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant = "primary" type = "submit">
                    Add Category
                  </Button>
                </Form>
              </div>
              <Form>
                {this.state.events.map(event => (
                  <Row>
                    <Col>
                      <Form.Group controlId = "category">
                        {event.categ}
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId = "score">
                        <DropdownButton title={event.tempScore} onSelect={this.handleChange}>
                          {event.scoretype}
                        </DropdownButton>
                      </Form.Group>
                    </Col>
                  </Row>
                ))}
              </Form>
              {this.state.disabled && (
                <Form data-test="theFinalScore">
                  <Button className="mb-2" variant="primary" onClick={this.handleCalculate}>
                    Calculate and Submit Score
                  </Button>
                  <Row>
                    <Col xs="2">
                      <Form.Control type = "text" value = {"Final Score: " + this.state.finalscore} readOnly = {true}/>
                    </Col>
                  </Row>
                </Form>
              )}
            </div>
          )}
          {!this.state.isAuthorized && (
            <h3 data-test="noAuthMsg">You are not authorized for create scoresheet in this tournament.</h3>
          )}
        </div>
      </LoadingOverlay>
    );
  }
}

export default Sheet;
