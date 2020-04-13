import React from 'react';
import axios from 'axios';
import { Form, Button, Col, Row } from 'react-bootstrap';


class Schedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tourneyId: this.props.match.params.tourneyId,
            startTime: "",
            endTime: "",
            numJudgeRooms: 0,
            numMatches: 0,
            teams: [],
            judging: [],
            robotScheduleTable1: [],
            robotScheduleTable2: []
        }
        this.handleSchedule = this.handleSchedule.bind(this);
    }

    //Very ugly may need to find better way to do this
    async handleSchedule(e) {
        e.preventDefault();
        var startTime = e.target.elements.startTime.value;
        var endTime = e.target.elements.endTime.value;
        var hour = parseInt(startTime.substring(0, startTime.indexOf(":")), 10);
        var min = parseInt(startTime.substring(startTime.indexOf(":") + 1), 10);

        //gets all teams in a tournament
        await axios.get(`/api/teams/tournid/${this.state.tourneyId}`).then((result) => {
            this.setState({ teams: result.data });
        }).catch((err) => {
            console.log(err);
        });

        //used to get number of matches in a tournament
        await axios.get(`/api/tournaments/${this.state.tourneyId}`).then((result) => {
            this.setState({ numMatches: result.data.matchesPerTeam })
            this.setState({ numJudgeRooms: result.data.numJudgeRooms });
        }).catch((err) => {
            console.log(err);
        })



        var events1 = [];
        var events2 = [];
        var judges = [];
        var teams = [];

        for (var names = 0; names < this.state.teams.length; names++) {
            teams.push(this.state.teams[names].teamName);
        }

        //populates robotSchedule
        for (var k = 0; k < this.state.numMatches; k++) {

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
                            sched[j] = teams[i];
                            break;
                        }
                    }
                } else {
                    sched[j] = teams[i];
                }


            }

            var table1 = [];
            var table2 = [];

            for (var z = 0; z < sched.length / 2; z++) {
                table1.push(sched[z]);
            }
            for (var x = sched.length / 2; x < sched.length; x++) {
                table2.push(sched[x]);
            }

            //adds times to each schedule
            for (var temp = 0; temp < table1.length; temp++) {
                var tempMin = "0" + min
                table1[temp] = hour + ":" + tempMin.substring(tempMin.length - 2) + " | " + table1[temp];
                table2[temp] = hour + ":" + tempMin.substring(tempMin.length - 2) + " | " + table2[temp];
                min += 5;
                if (min > 59) {
                    min -= 60;
                    hour++;
                }
                if (hour > 12) {
                    hour -= 12;
                }
            }

            if (table2.length != table1.length) {
                table2[table2.length - 1] = hour + ":" + tempMin.substring(tempMin.length - 2) + " | " + table2[table2.length - 1];
            }

            events1.push(table1);
            events2.push(table2);
            teams = [];

            //sets up teams for better randomization
            for (var l = 0; l < sched.length; l++) {
                teams.push(sched[l]);
            }
        }

        //for(var m = 0; m < this.state.teams.length/this.state.numJudgeRooms; m++) {

            var sched = new Array(this.state.teams.length).fill("");
            var temp = 0;
            for (var i = 0; i < sched.length; i++) {
                var j = Math.floor(Math.random() * sched.length);
                if (sched[j] !== "") {
                    while (1) {
                        j++;
                        if (j === sched.length) {
                            j = 0;
                        }
                        if (sched[j] === "") {
                            sched[j] = teams[temp];
                            break;
                        }
                    }
                } else {
                    sched[j] = teams[temp];
                }
                temp++;

            }


        this.setState({ judging: sched });
        this.setState({ robotScheduleTable1: events1 });
        this.setState({ robotScheduleTable2: events2 });
        this.setState({ startTime: startTime });
        this.setState({ endTime: endTime });
        console.log(this.state)

    }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSchedule}>
                    <Row>
                        <Col xs="2">
                            <Form.Group controlId="startTime">
                                <Form.Control type="text" placeholder="Start Time (hh:mm)" />
                            </Form.Group>
                        </Col>
                        <Col xs="2">
                            <Form.Group controlId="endTime">
                                <Form.Control type="text" placeholder="End Time (hh:mm)" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Button variant="outline-primary" type="submit">Generate Tournament Schedule</Button>
                    </Form.Group>
                </Form>

                <Form>
                    <Row>
                        <Col>
                            <h4>Table 1</h4>
                            {this.state.robotScheduleTable1.map((sched, index) => (
                                <Form.Group>
                                    <h5>Match {index + 1}</h5>
                                    {sched.map((robot) => (
                                        <Row>
                                            <Col xs="4">
                                                <Form.Control type="text" value={robot} readOnly={true} />
                                            </Col>
                                        </Row>
                                    ))}
                                </Form.Group>
                            ))}
                        </Col>
                        <Col>
                            <h4>Table 2</h4>
                            {this.state.robotScheduleTable2.map((sched, index) => (
                                <Form.Group>
                                    <h5>Match {index + 1}</h5>
                                    {sched.map((robot) => (
                                        <Row>
                                            <Col xs="4">
                                                <Form.Control type="text" value={robot} readOnly={true} />
                                            </Col>
                                        </Row>
                                    ))}
                                </Form.Group>
                            ))}
                        </Col>
                    </Row>
                    <Form.Group>
                        <h5>Judging Tables</h5>
                        {this.state.judging.map( tables => (
                            <Row>
                                <Col xs = "3">
                                    <Form.Control type="text" value={tables} readOnly={true} />                                
                                </Col>
                            </Row>
                        ))}
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default Schedule;
