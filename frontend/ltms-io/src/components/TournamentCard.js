import React, { Component } from 'react'
import {Card, Button} from 'react-bootstrap'
import axios from 'axios';

export default class TournamentCard extends Component {
    async setDirectorAuth() {
        console.log(this.props.tournament.director);
        await axios.get(`http://localhost:5000/api/users/${this.props.tournament.director}`).then((resp) => {
            if (resp.data) {
                console.log("=====")
                console.log(resp.data);
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
        var body = {
            auth_id: localStorage.getItem("auth0_id"),
            tournament_id: this.state.tournament._id
        }
        axios.post('http://localhost:5000/api/tournaments/addvolunteer', body)
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
                    (<Button>Edit tournament</Button>)
                    :
                    (<Button onClick={() => {this.volunteerForEvent()}}>Volunteer</Button>)
                    }
                </Card>
            </div>
        )
    }
}
