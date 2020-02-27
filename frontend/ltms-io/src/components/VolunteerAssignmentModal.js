import React, { Component } from 'react'
import { Container, Form, Button, Modal, Row, Col } from 'react-bootstrap'


export default class VolunteerAssignmentModal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container>
                <Modal
                show={true || this.props.show}
                onHide={this.props.handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Volunteer Assignment
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Form>
                                <Form.Group as={Row} controlId="volunteerSearchBox">
                                    <Form.Label column md="6">Input Volunteer Email</Form.Label>
                                    <Col lg="10">
                                        <Form.Control type="email" placeholder="Enter Email"/>
                                    </Col>
                                    <Button column type="submit">Search</Button>
                                </Form.Group>
                            </Form>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick="{this.props.show = false}">Close</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}
