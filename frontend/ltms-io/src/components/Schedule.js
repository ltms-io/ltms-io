import React from 'react';
import axios from 'axios';
import { Form, Button, Col, Row } from 'react-bootstrap';


class Schedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tourneyId: this.props.match.params.tourneyId,
            startTime: "",
            cycleTime: 0,
            numJudgeRooms: 0,
            numMatches: 0,
            numTables: 0,
            teams: [],
            droppedTeams: [],
            tableLayout: [],
            disabled: false
        }
        this.handleSchedule = this.handleSchedule.bind(this);
        this.randomizeTeams = this.randomizeTeams.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    randomizeTeams() {
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
            } else {
                sched[j] = this.state.teams[i];
            }


        }
        this.setState({ teams: sched });
    }

    handleChange(e) {
        e.preventDefault();
        var stat = {
            tourneyId: this.props.match.params.tourneyId,
            startTime: "",
            cycleTime: 0,
            numJudgeRooms: 0,
            numMatches: 0,
            numTables: 0,
            teams: [],
            tableLayout: [],
            disabled: false
        }
        this.setState(stat);
    }
    async handleDrop(e) {
        e.preventDefault()
        console.log(e.target.elements.teamDrops.value)
        var sss = this.state.droppedTeams
        sss.push(e.target.elements.teamDrops.value)
        this.setState({droppedTeams: sss});
        console.log(this.state.droppedTeams)
    }
    async handleSchedule(e) {
        e.preventDefault();
        if(!e.target.elements.startTime.value || !e.target.elements.cycleTime.value) {
            alert("Please enter start time and cycle time");
            return;
        }

        var startTime = e.target.elements.startTime.value;
        var cycleTime = parseInt(e.target.elements.cycleTime.value, 10);
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
            this.setState({ numMatches: result.data.matchesPerTeam });
            this.setState({ numJudgeRooms: result.data.numJudgeRooms });
            this.setState({ numTables: result.data.fieldsCount });
        }).catch((err) => {
            console.log(err);
        });

        var matchSchema = [];
        var table = 1;
        this.randomizeTeams();
        for(var j = 0; j<this.state.numMatches; j++) {
            for(var i = 0; i<this.state.teams.length; i += 2) {
                var tempMin = "0" + min;
                var match = {
                    match: j + 1,
                    table: table,
                    teamA: this.state.teams[i].teamName,
                    teamB: this.state.teams[i+1].teamName,
                    startTime: hour + ":" + tempMin.substring(tempMin.length - 2)
                }

                min += cycleTime;
                if(min > 59) {
                    min -= 60;
                    hour++;
                    if(hour > 12) {
                        hour -= 12;
                    }
                }

                matchSchema.push(match);
                if(table === this.state.numTables) {
                    table = 0;
                }
                table++;
            }
            this.randomizeTeams();
        }

        var tableArr = [];
        for(var k = 0; k < matchSchema.length; k += this.state.numTables) {
            var temp = [];
            for(var m = 0; m < this.state.numTables; m++) {
                if(!matchSchema[k+m]){
                    break;
                }
                temp.push(matchSchema[k+m]);
            }
            tableArr.push(temp);
        }
        
        console.log(tableArr);
        this.setState({ tableLayout: tableArr });
        this.setState({ disabled: true });
        this.setState({ startTime: startTime });
        this.setState({ cycleTime: cycleTime });

        await axios.post(`/api/tournament/schedule`, {
            id: this.state.tourneyId,
            startTime: this.state.startTime,
            cycleTime: this.state.cycleTime,
            rawData: JSON.stringify(this.state),
            match: this.state.tableLayout
        }).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })

    }

    render() {
        return (
            <div>
                {!this.state.disabled && (
                <Form onSubmit={this.handleSchedule}>
                    <Row>
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
                        <Button variant="outline-primary" type="submit">Generate Tournament Schedule</Button>
                    </Form.Group>
                </Form>
                )}

                <Form>
                    
                            {this.state.tableLayout.map((sched, index) => (
                                <Form.Group>
                                <Row>
                                {sched.map((robot, ind) => (
                                    <Col xs = "4">
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
                            <Button variant="outline-danger" type="submit">Generate New Schedule</Button>
                        </Form.Group>
                    </Form>

                )}
                <Form onSubmit={this.handleDrop}>
                        <div>
                        <Form.Group data-test="aCommentInput" controlId="teamDrops">
                      <Form.Label>Team Name</Form.Label>
                      <Form.Control as="textarea"/>
                    </Form.Group>
                        </div>
                        <Button type="submit">
                  Drop Team
                </Button>
                    </Form>
            </div>
        )
    }

    componentDidMount() {
        axios.get(`/api/tournaments/schedule/${this.state.tourneyId}`).then(result => {
            var stat = JSON.parse(result.data.rawData);
            this.setState(stat);
            console.log(this.state);
        }).catch(err => {
            console.log(err);
        })
    }
}

export default Schedule;
