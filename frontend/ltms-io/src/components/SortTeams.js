import React from 'react';
import {connect} from 'react-redux';
import {Form, Button, Col, Row, DropdownButton, Dropdown} from 'react-bootstrap';
import axios from 'axios';

export default class SortTeams extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            teams: []
        }
    }

    render() {
        return(
            <div>
                <h3>Tournament Team Ranking</h3>
                <Form onSubmit={this.handleSort}>
                    {this.state.teams.map((teams, i) => (
                        <h4>{i+1 + ".) "} {"Team: " + teams.teamNum} {"Score: " + teams.finalScore}</h4>
                    ))}
                </Form>
            </div>
        );
    }

    async componentDidMount() {
        await axios.get("http://localhost:5000/api/tournaments/5e7a5410be7af1ae4acc6314/scores").then( (results) => {
            var team = results.data;
            for(var j = 0; j<team.length; j++){
                for(var i = 0; i < team.length - 1; i++) {
                    if(team[i].finalScore < team[i+1].finalScore) {
                        var temp = team[i];
                        team[i] = team[i+1];
                        team[i+1] = temp;
                    }
                }
            }
            this.setState({teams: results.data});
        }).catch( (err) => {
            console.log(err);
        });

        console.log("INITIAL TOURNAMENT TEAMS", this.state);
    }
}