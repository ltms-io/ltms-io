import React, { Component } from 'react'
import axios from 'axios';
import { Row, Col, Container, Button, Form, DropdownButton, Dropdown } from 'react-bootstrap';

export default class EditScoreEntry extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tourneyId: this.props.match.params.tourneyId,
            scoreId: this.props.match.params.scoreId,

            authresults: {},
            userResults: {},
            scoreResults: {},
            rawData: [],
            events: [],
            insertIdx: 0,
            finalscore: 0,
            notesBox: ""
        }

        this.handleInsert = this.handleInsert.bind(this);
        this.updateState = this.updateState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.notesUpdate = this.notesUpdate.bind(this);
    }

    handleInsert(name, type) {
        var newArray = [...this.state.events];
        var cate = name;
        var score;
        var eventKey = name.charAt(0);

        if (type === "Yes/No") {
            score = <div>
                <Dropdown.Item key="yes" eventKey={"y" + eventKey} active={this.state.scoreResults.fieldValues[this.state.insertIdx] == "Yes"}>Yes</Dropdown.Item>
                <Dropdown.Item key="no" eventKey={"n" + eventKey} active={this.state.scoreResults.fieldValues[this.state.insertIdx] == "No"}>No</Dropdown.Item>
            </div>
        } else {
            score = <div>
                <Dropdown.Item key="1" eventKey={"1" + eventKey} active={this.state.scoreResults.fieldValues[this.state.insertIdx] == "1"}>1</Dropdown.Item>
                <Dropdown.Item key="2" eventKey={"2" + eventKey} active={this.state.scoreResults.fieldValues[this.state.insertIdx] == "2"}>2</Dropdown.Item>
                <Dropdown.Item key="3" eventKey={"3" + eventKey} active={this.state.scoreResults.fieldValues[this.state.insertIdx] == "3"}>3</Dropdown.Item>
                <Dropdown.Item key="4" eventKey={"4" + eventKey} active={this.state.scoreResults.fieldValues[this.state.insertIdx] == "4"}>4</Dropdown.Item>
                <Dropdown.Item key="5" eventKey={"5" + eventKey} active={this.state.scoreResults.fieldValues[this.state.insertIdx] == "5"}>5</Dropdown.Item>
            </div>
        }

        newArray.push({
            categ: <Form.Control type="text" value={cate} disabled />,
            scoretype: score,
            tempScore: "Score"
        })

        var newIdx = this.state.insertIdx + 1;
        this.setState({
            events: newArray,
            insertIdx: newIdx
        });
    }

    handleChange(eventKey) {
        console.log(parseInt(eventKey.substring(1), 10));
        console.log(this.state.events[parseInt(eventKey.substring(1), 10) - 1].tempScore);
        console.log(eventKey);
        var newArray = [...this.state.events];

        if (eventKey.substring(0, 1) === "y" || eventKey.substring(0, 1) === "n") {

            if (eventKey.substring(0, 1) === "y") {
                newArray[parseInt(eventKey.substring(1), 10) - 1].tempScore = "Yes";
            } else {
                newArray[parseInt(eventKey.substring(1), 10) - 1].tempScore = "No";
            }

        } else {
            newArray[parseInt(eventKey.substring(1), 10) - 1].tempScore = eventKey.substring(0, 1);
        }

        this.setState({ events: newArray });
    }

    handleUpdate(e) {
        e.preventDefault();

        var index = this.state.events.length;
        var score = 0;

        for (var i = 0; i < index; i++) {
            if (this.state.events[i].tempScore === "Yes") {
                score += 5;
            } else if (this.state.events[i].tempScore === "No") {
                continue;
            } else {
                score += parseInt(this.state.events[i].tempScore, 10);
            }
        }

        this.setState({ finalscore: score });

        var fixedCats = [];
        var fixedScores = [];
        this.state.events.forEach(event => {
            fixedCats.push(event.categ.props.value);
            fixedScores.push(event.tempScore);
        });

        alert("submitting");

        axios.patch(`http://localhost:5000/api/tournaments/${this.state.tourneyId}/scores/${this.state.scoreId}`, {
            id: "5e7a5410be7af1ae4acc6314",
            fieldTypes: fixedCats,
            fieldValues: fixedScores,
            teamNum: this.state.team,
            scoreType: "match",
            finalScore: this.state.finalscore,
            rawData: JSON.stringify(this.state.events),
            changeNotes: this.state.notesBox
        }).then(res => {
            window.location = '/maindashboard';
        }).catch(err => {
            console.log(err);
        })
    }

    notesUpdate(e) {
        e.preventDefault();

        this.setState({
            notesBox: e.target.value
        });
    }

    async componentDidMount() {
        await this.updateState();
    }

    async updateState() {
        await axios({
            method: 'GET',
            url: `https://dev-s68c-q-y.auth0.com/userinfo`,
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem("access_token")
            },
            json: true
        }).then((result) => {
            this.state.authresults = result.data;
        }).catch((error) => {
            console.log(error);
        });

        await axios.post(`http://localhost:5000/api/users/getuser`, {
            auth0id: this.state.authresults.sub
        }).then((result) => {
            this.state.userResults = result.data;
        }).catch((error) => {
            console.log(error);
        });

        await axios.get(`http://localhost:5000/api/tournaments/${this.state.tourneyId}/scores/${this.state.scoreId}`).then((result) => {
            this.state.scoreResults = result.data;
            this.state.rawData = JSON.parse(result.data.rawData);
            this.state.rawData.forEach(item => {
                this.handleInsert(item.categ.props.value, item.explicitType);
            });
        }).catch((error) => {
            console.log(error);
        });

        this.setState(this.state);
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h1 className="text-center">Edit Score</h1>
                <h3 className="text-center">This is a {this.state.scoreResults.scoreType}</h3>

                <Container>
                    <Form>
                        {this.state.rawData && console.log(this.state)}
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
                    <Button variant="warning" onClick={this.handleUpdate}>
                        Submit Changes
                    </Button>
                </Container>
            </div>
        )
    }
}
