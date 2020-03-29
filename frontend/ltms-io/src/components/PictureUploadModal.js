//some code pulled from https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/

import React, { Component } from 'react'
import { Container, Button, Modal } from 'react-bootstrap'
import axios from 'axios';
import { Pacman } from 'react-pure-loaders';
import LoadingOverlay from 'react-loading-overlay';
const jsonWeb = require('jsonwebtoken');


export default class PictureUploadModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedFile: null,
            uploading: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        })
    }

    handleSubmit(event) {
        this.setState({
            uploading: true
        });

        var data = new FormData();
        data.set("username", this.props.name);
        data.append("file", this.state.selectedFile);
        //TODO: Replace with current user id
        var token = document.cookie.substring(13);
        var decoded = jsonWeb.verify(token, "123456");
        data.append("auth0id", decoded.auth0Id);

        axios.post('http://localhost:5000/api/users/uploadpicture', data, {
            'Content-Type': 'multipart/form-data'
        })
        .then(res => {
            this.setState({
                uploading: false
            })
            console.log(res);

            this.props.handleClose()
        })
        .catch(err => {
            this.setState({
                uploading: false
            })
            console.log(err);
        });
    }

    render() {
        return (
            <LoadingOverlay active={this.state.uploading} spinner={<Pacman loading color="black" />} text='Uploading...' >
                <Container>
                    <Modal
                    show={!this.state.uploading && this.props.show}
                    onHide={this.props.handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Picture Upload
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h3>Upload your picture!</h3>
                            <input required type="file" name="file" onChange={this.handleChange} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleSubmit}>Upload</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </LoadingOverlay>
        )
    }
}