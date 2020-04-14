import React, { Component } from 'react'
import {Card, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class TournamentCard extends Component {
    async setDirectorAuth() {
        console.log(this.props.tournament.director);
        await axios.get(`/api/users/${this.props.tournament.director}`).then((resp) => {
            if (resp.data) {
                this.setState({directorAuth: resp.data.auth0id});
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            tournament: this.props.tournament,
            directorAuth: '',
        }
        this.setDirectorAuth();
    }

   
    volunteerForEvent() {
        console.log(localStorage.getItem("auth0_id"));
        var body = {
            auth_id: localStorage.getItem("auth0_id"),
            tournament_id: this.state.tournament._id
        }
        axios.post('/api/tournaments/addvolunteer', body).then((res) => {

        }).catch((err) => {

        })
    }


    render() {
        return (
            <div>
                <Card className="m-2">
                    <ul className="m-2">
                        <li>{this.state.tournament.name}</li>
                        <li>{this.state.tournament.startDate}</li>
                        <li>{this.state.tournament.location}</li>
                        <li>{this.state.tournament.matchesPerTeam}</li>
                    </ul>
                    { localStorage.getItem("auth0_id") === this.state.directorAuth ?
                    (<Link to={"/tournamentdashboard/" + this.state.tournament._id} >
                        <Button className="m-3">Access Tournament</Button>
                    </Link>)
                    :
                    (<Button onClick={() => {this.volunteerForEvent()}}>Volunteer</Button>)
                    }
                </Card>
            </div>
        )
    }
}
