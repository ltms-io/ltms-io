import React, { Component } from 'react'
import { Container, Col, Row, Form} from 'react-bootstrap'
import { SingleDatePicker } from 'react-dates'

export default class CreateEvent extends Component {
    render() {
        return (
            <Container>
                <Row><Col>
                    <h2 className="mb-4">Create a Tournament</h2>
                    <Form>
                        <h3>Basic Info</h3>
                        <Form.Group as={Row} controlId="formGridTourneyName">
                            <Form.Label column sm="2">Tournament Name</Form.Label>
                            <Col sm="10">
                                <Form.Control placeholder="e.g. Purdue University FIRST LEGO League Qualifying Tournament" />
                            </Col>
                        </Form.Group>
                        <Row>
                            <Form.Group as={Col} controlId="formGridTourneyDate">
                                <Form.Label>Date</Form.Label>
                                <SingleDatePicker /> { /** I know... this looks UGLY. TODO. Docs: https://github.com/airbnb/react-dates */}
                            </Form.Group>
                        </Row>
                    </Form>
                </Col></Row>
            </Container>
        )
    }
}
