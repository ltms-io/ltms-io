import React, { Component } from 'react'
import { Container, Col, Row, Form, Button} from 'react-bootstrap'
import { SingleDatePicker } from 'react-dates'

export default class CreateEvent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            date: null,
            focused: false,
        }
    }
    

    render() {
        return (
            <Container>
                {/* <Row><Col> */}
                    <h2 className="mb-4">Create a Tournament</h2>
                    <Form>
                        <Row className="mt-5">
                            <Col>
                                <h3>Basic Info</h3>
                                <Form.Group as={Row} controlId="formGridTourneyName">
                                    <Form.Label column md="2">Name</Form.Label>
                                    <Col lg="10">
                                        <Form.Control placeholder="e.g. Purdue University FIRST LEGO League Qualifying Tournament" />
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
                                        <Form.Control placeholder="e.g. Purdue Univerity Armory" />
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col>
                                <h3>Numbers</h3>
                                <Form.Group as={Row} controlId="formGridNumMatchesPT">
                                    <Form.Label column md="4">Matches/Team</Form.Label>
                                    <Col lg="8">
                                        <Form.Control />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formGridNumTables">
                                    <Form.Label column md="4">Tables</Form.Label>
                                    <Col lg="8">
                                        <Form.Control />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formGridNumJudgeRooms">
                                    <Form.Label column md="4">Judging Rooms</Form.Label>
                                    <Col lg="8">
                                        <Form.Control placeholder="Must be multiple of 3"/>
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

                        <Button className="mt-5">Create Event!</Button>
                    </Form>
                {/* </Col></Row> */}
            </Container>
        )
    }
}
