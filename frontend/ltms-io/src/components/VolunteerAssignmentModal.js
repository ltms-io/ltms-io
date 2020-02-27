import React, { Component } from 'react'
import axios from 'axios';
import { Container, Form, FormControl, Button, Modal, Row, Col } from 'react-bootstrap'


export default class VolunteerAssignmentModal extends Component {
    constructor(props) {
        super(props)
        this.email = '';
        this.emailInput = React.createRef();
        this.searchFunction = this.searchFunction.bind(this);
    }

    searchFunction() {
        const params = {
            email: this.emailInput.current.value,
        }
    
        //axios.get({url: 'http://localhost:5000/api/users/email', data: params}).then((x) => {console.log(x)});
        console.log(this.emailInput.current.value);
    }


    render() {
        return (
            <Container>
                <Modal
                show={this.props.show}
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
                            <Col>
                                <Form>
                                    <Form.Group as={Row} controlId="volunteerSearchBox">
                                        <Form.Label  md="6">Input Volunteer Email</Form.Label>
                                        <Col lg="10">
                                            <FormControl 
                                                type="email"
                                                placeholder="User Email"
                                                ref={this.emailInput}/>
                                        </Col>
                                        <Button column='1' type="button" color="primary"  onClick={this.searchFunction}>Search</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }

}
