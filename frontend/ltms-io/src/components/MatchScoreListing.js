import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import axios from 'axios'

export default class MatchScoreListing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tourneyId: this.props.match.params.tourneyId,
            authresults: {},
            userResults: {},
            scoreResults: []
        }

        this.updateState = this.updateState.bind(this);
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

        await axios.get(`http://localhost:5000/api/tournaments/${this.state.tourneyId}/scores`).then((result) => {
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
                <h1 className="text-center">Match Scores</h1>
                <ListGroup>
                    {this.state.scoreResults.map((item, i) => {
                        return (
                            <ListGroup.Item action href={`/t/${this.state.tourneyId}/editscore/${item._id}`}>
                                <h4>Match: {item._id}</h4>
                                <hr />
                                <h5>Final Score: {item.finalScore}</h5>
                                <h5 className="text-right">Team: {item.teamNum}</h5>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </div>
        )
    }
}
