import React from 'react';
import axios from 'axios';
import {Form, Button, Col, Row} from 'react-bootstrap';


class Schedule extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tourneyId: this.props.match.params.tourneyId,
            startTime: "",
            endTime: ""
        }
        this.handleSchedule = this.handleSchedule.bind(this);
    }

    async handleSchedule(e) {
        e.preventDefault();
        this.setState({startTime: e.target.elements.startTime.value});
        this.setState({endTime: e.target.elements.endTime.value});
        var hour = parseInt(e.target.elements.startTime.value.substring(0,2));
        console.log(hour);

        await axios.get(`http://localhost:5000/api/teams/tournid/${this.state.tourneyId}`).then( (result) => {
            console.log(result.data[0].teamName);
        }).catch( (err) => {
            console.log(err);
        });

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
                    <Button variant = "outline-primary" type = "submit">Generate Tournament Schedule</Button>
                </Form>
            </div>
        )
    }
}

export default Schedule;
