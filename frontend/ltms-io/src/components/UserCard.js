import React, { Component} from 'react';
import {Card} from 'react-bootstrap';

export default class UserCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card>
                <ul> 
                    <li>{this.props.user.name}</li>
                    <li>{this.props.user.email}</li>
                </ul>
            </Card>
        )
    }
}
