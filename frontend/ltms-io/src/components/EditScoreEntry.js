import React, { Component } from 'react'
import axios from 'axios';

export default class EditScoreEntry extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tourneyId: this.props.match.params.tourneyId,
            scoreId: this.props.match.params.scoreId,

            authresults: {},
            userResults: {},
            scoreResults: {},
        }
    }

    async componentDidMount() {
        await this.updateState();
    }

    async updateState() {
        await axios({
            method: 'GET',
            url: `https://dev-s68c-q-y.auth0.com/userinfo`,
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem("access_token")
            },
            json: true
        }).then((result) => {
            this.state.authresults = result.data;
        }).catch((error) => {
            console.log(error);
        });

        await axios.post(`http://localhost:5000/api/users/getuser`, {
            auth0id: this.state.authresults.sub
        }).then((result) => {
            this.state.userResults = result.data;
        }).catch((error) => {
            console.log(error);
        });

        await axios.get(`http://localhost:5000/api/tournaments/${this.state.tourneyId}/scores/${this.state.scoreId}`).then((result) => {
            this.state.scoreResults = result.data;
        }).catch((error) => {
            console.log(error);
        });

        this.setState(this.state);
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h1 className="text-center">Edit Score</h1>
                <h3 className="text-center">This is a {this.state.scoreResults.scoreType}</h3>


            </div>
        )
    }
}
