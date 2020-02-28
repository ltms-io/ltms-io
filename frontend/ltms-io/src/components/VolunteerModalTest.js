import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import VolunteerAssignmentModal from './VolunteerAssignmentModal';

export default class VolunteerModalTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addVolunteerShow: false,
            volunteer: {
                name: '',
                email: '',
                _id: '',
            },
            showData: false,
        }
    }

    render() {
        return (
            <div>
                <Button 
                    onClick={() => this.setState({addVolunteerShow: true})} >
                        Test out the modal!!
                    </Button>
                <VolunteerAssignmentModal
                    show={this.state.addVolunteerShow}
                    addVolunteer={this.demonstrateUser}
                    handleClose={() => this.setState({addVolunteerShow: false})}
                    buttonText="volunteer"/>

                {this.state.showData ?
                <ul>
                    <li>{this.state.volunteer.name}</li>
                    <li>{this.state.volunteer.email}</li>
                    <li>{this.state.volunteer._id}</li>
                </ul>
                : null }
            </div>
        )
    }

    demonstrateUser = (volunteer) => {
        console.log(volunteer);
        this.setState({volunteer: volunteer, showData: true});
    }
}
