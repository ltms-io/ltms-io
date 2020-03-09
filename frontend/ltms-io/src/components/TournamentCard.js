import React, { Component } from 'react'
import {Card} from 'react-bootstrap'

export default class TournamentCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tournament: this.props.tournament
        }
    }
    render() {
        return (
            <div>
                <Card className="m-2">
                    <ul className="m-2">
                        <li>{this.state.tournament.name}</li>
                        <li>{this.state.tournament.startDate}</li>
                        <li>{this.state.tournament.fieldsCount}</li>
                        <li>{this.state.tournament.matchesPerTeam}</li>
                    </ul>

                </Card>
            </div>
        )
    }
}
