import React from 'react';
import {connect} from 'react-redux';
import {Form, Button, Col, Row, DropdownButton, Dropdown} from 'react-bootstrap';

class Sheet extends React.Component{

  //Constructor sets up the state variable
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      team: 0,
      readOnly: false,
      events: [],
      runningScore: 0,
      finalscore: 0,
      scoreType: "Score Type",
      index: 0,
      category: "Category"
    }

    //binds the fuction
    this.handleInsert = this.handleInsert.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.handleScoreSelect = this.handleScoreSelect.bind(this);
    this.handleTeam = this.handleTeam.bind(this);
    this.changeTeam = this.changeTeam.bind(this);
  }

  handleScoreSelect(eventKey){

    if(eventKey === "yes"){
      this.setState({scoreType: "Yes/No"});
    }else{
      this.setState({scoreType: "1-5"});
    }

  }

  //function to allow edits to team scored
  changeTeam(e) {

    this.setState({readOnly: false});

  }

  //function saves the team being scored
  handleTeam(e) {

    e.preventDefault();

    if(e.target.elements.teamName.value != ""){
      this.setState({team: e.target.elements.teamName.value});
      this.setState({readOnly: true});
    }

  }

  //function to handle the calculate score call
  handleInsert(e) {

    e.preventDefault()

    if(e.target.elements.category.value === "") {
      return;
    }
    if(this.state.scoreType === "Score Type"){
      return;
    }

    var newArray = [...this.state.events];
    var cate = (this.state.index+1).toString() + ". " + e.target.elements.category.value;
    e.target.reset();
    var score; 
    var eventKey = (this.state.index).toString();

    if(this.state.scoreType === "Yes/No"){
      score = <div>
                <Dropdown.Item key="yes" eventKey={"y"+eventKey}>Yes</Dropdown.Item>
                <Dropdown.Item key="no" eventKey={"n"+eventKey}>No</Dropdown.Item>
              </div>
    }else{
      score = <div>
                <Dropdown.Item key="1" eventKey={"1"+eventKey}>1</Dropdown.Item>
                <Dropdown.Item key="2" eventKey={"2"+eventKey}>2</Dropdown.Item>
                <Dropdown.Item key="3" eventKey={"3"+eventKey}>3</Dropdown.Item>
                <Dropdown.Item key="4" eventKey={"4"+eventKey}>4</Dropdown.Item>
                <Dropdown.Item key="5" eventKey={"5"+eventKey}>5</Dropdown.Item>
              </div>
    }

    newArray.push({
      categ: <Form.Control type = "text" value = {cate}/>,
      scoretype: score,
      tempScore: "Score"
    })

    this.setState({events: newArray});
    var index = this.state.index+1;
    this.setState({index: index});
    this.setState({scoreType: "Score Type"})
  }

  //function to save the score type for a specific category
  handleChange(eventKey){

    console.log(this.state.events[parseInt(eventKey.substring(1), 10)].tempScore);
    console.log(eventKey);
    var newArray = [...this.state.events];

    if(eventKey.substring(0,1) === "y" || eventKey.substring(0,1) === "n"){

      if(eventKey.substring(0,1) === "y"){
        newArray[parseInt(eventKey.substring(1), 10)].tempScore = "Yes";
      }else{
        newArray[parseInt(eventKey.substring(1), 10)].tempScore = "No";
      }

    }else{
      newArray[parseInt(eventKey.substring(1), 10)].tempScore = eventKey.substring(0,1);
    }

    this.setState({events: newArray});
  }

  //function to calculate team score
  handleCalculate(e){

    e.preventDefault();

    if(this.state.readOnly === false){
      alert("Please set the team being scored");
      return;
    }

    var index = this.state.index;
    var score = 0;

    for(var i = 0; i<index; i++){

      if(this.state.events[i].tempScore === "Yes"){
        score += 5;
      }else if(this.state.events[i].tempScore === "No"){
        continue;
      }else{
        score += parseInt(this.state.events[i].tempScore, 10);
      }

    }

    this.setState({finalscore: score});

  }
    
  //render function
  render(){

    return(
      <div>
        <h3>Enter Team</h3>
        <Form onSubmit={this.handleTeam}>
          <Row>
            <Col>
          <Form.Group controlId = "teamName">
            <Form.Control type = "text" placeholder = "Team" readOnly={this.state.readOnly}/>
          </Form.Group>
            </Col>
            <Col>
              <Button variant = "outline-primary" type="submit">
                Set Team
              </Button>
            </Col>
            <Col>
              <Button variant = "outline-danger" onClick={this.changeTeam}>
                Change Team
              </Button>
            </Col>
          </Row>
        </Form>
        <Form onSubmit={this.handleInsert}>
          <h3>Add a category</h3>
          <Row>
            <Col>
              <Form.Group controlId = "category">
                <Form.Control type = "text" placeholder = "Category"/>
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
          <Button variant = "outline-primary" type = "submit">
            Add Category
          </Button>
        </Form>
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
        <Form>
          <Button variant = "outline-primary" onClick={this.handleCalculate}>
            Calculate Score
          </Button>
          <Row>
            <Col xs = "2" font>
            <Form.Control type = "text" value = {"Final Score: " + this.state.finalscore} readonly = {true}/>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Sheet;