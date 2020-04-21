import React, { Component } from 'react'
import axios from 'axios';
import { Alert, Container, InputGroup, FormControl, Button, ButtonGroup, Modal, Row, Col } from 'react-bootstrap';
import UserCard from './UserCard';

export default class VolunteerAssignmentModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errMsg: 'Error',
            showAlert: false,
            showVolunteer: false,
            volunteer: {},
        }
        this.emailInput = React.createRef();
        this.searchFunction = this.searchFunction.bind(this);
    }

    searchFunction() {
        const body = {
            email: this.emailInput.current.value,
        }

       axios({method: 'post', url: '/api/users/search', data: body})
        .then((x) => {
            console.log(x.data);
            this.setState({showAlert: false, showVolunteer: true});
            this.setState({volunteer: x.data});
        })
        .catch((x) => {
            console.log(x);
            this.setState({showAlert: true, errMsg: 'User was not found'});
        });
    }

    addVolunteer = () => {
        this.props.addVolunteer(this.state.volunteer);
    }

    render() {
        return (
            <Container>
                <Modal
                    show={this.props.show}
                    onHide={this.props.handleClose}
                    size="lg"
                    centered>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Volunteer Assignment
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <Alert
                                    variant="danger"
                                    show={this.state.showAlert}
                                    dismissible
                                    onClose={() => {this.setState({showAlert: false})}}>
                                    {this.state.errMsg}
                                </Alert>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup className="mb-2">
                                    <FormControl
                                        type="email"
                                        placeholder="User Email"
                                        ref={this.emailInput}/>
                                    <InputGroup.Append>
                                        <Button type="button" variant="primary"  onClick={this.searchFunction}>Search</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.state.showVolunteer ? <UserCard user={this.state.volunteer}/>: null}
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonGroup className="mr-2">
                            <Button onClick={this.addVolunteer}>Add {this.props.buttonText}</Button>
                            <Button variant="danger" onClick={this.props.handleClose}>Close</Button>
                        </ButtonGroup>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }

}
