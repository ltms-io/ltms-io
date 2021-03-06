//some code pulled from https://www.w3schools.com/react/react_forms.asp and

import React, { Component } from 'react'
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { SingleDatePicker } from 'react-dates'
import axios from 'axios';
import { Pacman } from 'react-pure-loaders';
import LoadingOverlay from 'react-loading-overlay';
const jsonWeb = require('jsonwebtoken');
//import { Redirect } from 'react-router-dom';

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
            uploading: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        await this.setState({ [name]: value });
    }

    async handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            await this.setState({validated: true});
        }
        else {
            event.preventDefault();
            event.persist();
            await this.setState({
              uploading: true
            });

            var token = document.cookie.substring(13);
            var decoded = jsonWeb.verify(token, "123456");
            await axios.post("/api/tournaments/register", {
                auth0id: decoded.auth0id, //TODO: add director from authed user
                name: this.state.tourneyName,
                teams: "",
                officialEventFlag: true, //TODO: implement checking
                //TODO: send JA
                //TODO: send head ref
                fieldsCount: this.state.numTables,
                matchesPerTeam: this.state.numMatches,
                startDate: this.state.date,
                endDate: this.state.date
            })
            .then( async (res) => {
                console.log(res);
                await this.setState({
                  uploading: false
                });
                window.location = '/maindashboard';
            })
            .catch( async (err) => {
                console.log(err);
            })
        }
    }

    render() {
        return (
          <LoadingOverlay active={this.state.uploading} spinner={<Pacman loading color="black" />} text='Loading...' >
            <Container className="pl-3 pr-3 pt-2">
                <h1 className="text-center">Create a Tournament</h1>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Row className="mt-4">
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
                            <Form.Group className="pl-3" as={Row} controlId="formGridInputTeams">
                                <Form.Label>Team Input</Form.Label>
                                <Form.Control disabled as="textarea" placeholder="Coming Soon" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="text-center">
                      <Button className="mt-4" type="submit">Create Tournament</Button>
                    </div>
                </Form>
                {/* </Col></Row> */}
            </Container>
          </LoadingOverlay>
        )
    }
}
