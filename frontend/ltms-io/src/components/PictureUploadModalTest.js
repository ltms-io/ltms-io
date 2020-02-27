import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import PictureUploadModal from './PictureUploadModal';

export default class PictureUploadModalTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addVolunteerShow: false,
        }
    }

    render() {
        return (
            <div>
                <Button 
                    onClick={() => this.setState({addVolunteerShow: true})} >
                        Test out the modal!!
                    </Button>
                <PictureUploadModal show={this.state.addVolunteerShow} handleClose={() => this.setState({addVolunteerShow: false})}></PictureUploadModal>
            </div>
        )
    }
}