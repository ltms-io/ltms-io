//some code pulled from https://www.w3schools.com/react/react_forms.asp and

import React, { Component } from 'react'
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { SingleDatePicker } from 'react-dates'

export default class CreateEvent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: null,
            focused: false,
            tourneyName: null,
            tourneyLocation: null,
            numMatches: null,
            numTables: null,
            numJudgeRooms: null,
            judgeAdvisor: null,
            headReferee: null,
            validated: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.setState({validated: true});

        event.preventDefault();
        //TODO: Call create event API
    }

    render() {
        return (
            <Container>
                {/* <Row><Col> */}
                <h2 className="mb-4">Create a Tournament</h2>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Row className="mt-5">
                        <Col>
                            <h3>Basic Info</h3>
                            <Form.Group as={Row} controlId="formGridTourneyName">
                                <Form.Label column md="2">Name</Form.Label>
                                <Col lg="10">
                                    <Form.Control required placeholder="e.g. Purdue University FIRST LEGO League Qualifying Tournament" name="tourneyName" onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formGridTourneyDate">
                                <Form.Label column md="2" className="mr-3">Date</Form.Label>
                                <SingleDatePicker
                                    required
                                    showClearDate
                                    numberOfMonths="1"
                                    date={this.state.date}
                                    onDateChange={date => this.setState({ date })}
                                    focused={this.state.focused}
                                    onFocusChange={({ focused }) => this.setState({ focused })}
                                    id="tourneyCreateDatePicker"
                                />  {/* https://github.com/airbnb/react-dates */}
                            </Form.Group>

                            <Form.Group as={Row} controlId="formGridTouneyLocation">
                                <Form.Label column md="2">Location</Form.Label>
                                <Col lg="10">
                                    <Form.Control required placeholder="e.g. Purdue Univerity Armory" name="tourneyLocation" onChange={this.handleChange} />
                                </Col>
                            </Form.Group>
                        </Col>

                        <Col>
                            <h3>Numbers</h3>
                            <Form.Group as={Row} controlId="formGridNumMatchesPT">
                                <Form.Label column md="4">Matches/Team</Form.Label>
                                <Col lg="8">
                                    <Form.Control required name="numMatches" onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formGridNumTables">
                                <Form.Label column md="4">Tables</Form.Label>
                                <Col lg="8">
                                    <Form.Control required name="numTables" onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formGridNumJudgeRooms">
                                <Form.Label column md="4">Judging Rooms</Form.Label>
                                <Col lg="8">
                                    <Form.Control required placeholder="Must be multiple of 3" name="numJudgeRooms" onChange={this.handleChange} />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col>
                            <h3>Key Volunteers</h3>
                            <Form.Group as={Row} controlId="formGridSelectJudgeAdvisor">
                                <Form.Label column md="4">Judge Advisor</Form.Label>
                                <Col><Button>Select</Button></Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formGridSelectHeadRef">
                                <Form.Label column md="4">Head Referee</Form.Label>
                                <Col><Button>Select</Button></Col>
                            </Form.Group>
                        </Col>

                        <Col>
                            <h3>Teams</h3>
                            <Form.Group as={Row} controlId="formGridInputTeams">
                                <Form.Label>Team Input</Form.Label>
                                <Form.Control disabled as="textarea" placeholder="Coming Soon" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button className="mt-5" type="submit">Create Event!</Button>
                </Form>
                {/* </Col></Row> */}
            </Container>
        )
    }
}
