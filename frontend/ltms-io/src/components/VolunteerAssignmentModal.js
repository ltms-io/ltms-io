import React, { Component } from 'react'
import { Container, Table, FormControl, Form, Button, Modal } from 'react-bootstrap'


export default class VolunteerAssignmentModal extends Component {
    constructor(props) {
        super(props)
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
                            Enter volunteers to add
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Label>Input Volunteer Email</Form.Label>
                            <FormControl type="email" placeholder="Enter Email"/>
                            <Button>Search</Button>
                        </Form>
                        <Table></Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick="{this.props.show = false}">Close</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}
