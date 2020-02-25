import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import VolunteerAssignmentModal from './VolunteerAssignmentModal';

export default class VolunteerModalTest extends Component {
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
                    onClick={() => this.setState({addVolunteerShow: true})}
                    handleClose={() => this.setState({addVolunteerShow: false})} >
                        Test out the modal!!
                    </Button>
                <VolunteerAssignmentModal show={this.state.addVolunteerShow}></VolunteerAssignmentModal>
            </div>
        )
    }
}
