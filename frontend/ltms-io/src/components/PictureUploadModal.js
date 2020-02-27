//some code pulled from https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/

import React, { Component } from 'react'
import { Container, Form, Button, Modal, Row, Col } from 'react-bootstrap'
import axios from 'axios';


export default class PictureUploadModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedFile: null,
            uploadDone: false
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
        var data = new FormData();
        // data.set("uuid", "UUID_GOES_HERE");
        data.append("file", this.state.selectedFile)

        axios.post('http://localhost:5000/api/users/uploadpicture', data, {
            'Content-Type': 'multipart/form-data'
        })
        .then(res => {
            //TODO: set upload to false
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
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
        )
    }
}