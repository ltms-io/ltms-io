import React from 'react';
import axios from 'axios';
import {Form, Button, Col, Row} from 'react-bootstrap';


class Schedule extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tourneyId: this.props.match.params.tourneyId,
            startTime: "",
            endTime: "",
            teams: [],
            robotPerformance: []
         }
        this.handleSchedule = this.handleSchedule.bind(this);
    }

    async handleSchedule(e) {
        e.preventDefault();
        this.setState({startTime: e.target.elements.startTime.value});
        this.setState({endTime: e.target.elements.endTime.value});
        var time = e.target.elements.startTime.value;
        var hour = parseInt(time.substring(0, time.indexOf(":")), 10);
        var min = parseInt(time.substring(time.indexOf(":") + 1), 10);

        await axios.get(`http://localhost:5000/api/teams/tournid/${this.state.tourneyId}`).then( (result) => {
            this.setState({teams: result.data});
        }).catch( (err) => {
            console.log(err);
        });



        var events = [];
        

        var sched = new Array(this.state.teams.length).fill("");
        for(var i = 0; i < sched.length; i++) {
            var j = Math.floor(Math.random() * sched.length);
            if(sched[j] !== "") {
                while(1) {
                    j++;
                    if(j === sched.length) {
                        j = 0;
                    }
                    if(sched[j] === "") {
                        sched[j] = hour + ":" + min + " | " + this.state.teams[i].teamName;
                        break;
                    }
                }
            } else {
                sched[j] = hour + ":" + min + " | " + this.state.teams[i].teamName;
            }
        }
        this.setState({schedules:{robotSchedule: sched}});

    }
    render(){
        return(
            <div>
                <Form onSubmit={this.handleSchedule}>
                    <Row>
                        <Col xs = "2">
                            <Form.Group controlId="startTime">
                                <Form.Control type="text" placeholder="Start Time (hh:mm)" />
                            </Form.Group>
                        </Col>
                        <Col xs = "2">
                            <Form.Group controlId="endTime">
                                <Form.Control type="text" placeholder="End Time (hh:mm)" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                    <Button variant = "outline-primary" type = "submit">Generate Tournament Schedule</Button>
                    </Form.Group>
                </Form>
                
                <Form>
                    {this.state.schedules.robotSchedule.map(sched => (
                        <Row>
                            <Col xs = "4">
                            <Form.Control type="text" value={sched} readOnly = {true} />
                            </Col>
                        </Row>
                    ))}
                </Form>
            </div>
        )
    }
}

export default Schedule;
