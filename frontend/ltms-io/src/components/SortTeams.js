import React from 'react';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';
const jsonWeb = require('jsonwebtoken');

export default class SortTeams extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      tourneyId: this.props.match.params.tourneyId,
      uid: "",
      dbresults: {},
      dbtournresults: {},
      teams: []
    }
  }

  async componentDidMount() {
    if (document.cookie.length) {
      var token = document.cookie.substring(13);
      var decoded = jsonWeb.verify(token, "123456");

      await this.setState({
        dbresults: decoded,
        uid: decoded.auth0id
      });
    }

    await axios.get(`/api/tournaments/${this.state.tourneyId}`)
    .then( async (result) => {
      await this.setState({
        dbtournresults: result.data
      });
    })
    .catch( (error) => {
      console.log(error);
    });

    await axios.get(`/api/tournaments/${this.state.tourneyId}/scores`)
    .then( (results) => {
      var team = results.data;
      for (var j = 0; j < team.length; j++) {
        for (var i = 0; i < team.length - 1; i++) {
          if(team[i].finalScore < team[i + 1].finalScore) {
            var temp = team[i];
            team[i] = team[i+1];
            team[i+1] = temp;
          }
        }
      }
      this.setState({teams: results.data});
    })
    .catch( (err) => {
      console.log(err);
    });

    console.log("INITIAL TOURNAMENT RANKING", this.state);
  }

  render() {
    return(
      <div className="pl-3 pr-3 pt-2">
        <h1>Team Rankings for Tournament "{this.state.dbtournresults.name}"</h1>
        {this.state.teams && (
          <ListGroup>
            {this.state.teams.map( (item, i) => {
              return (
                <ListGroup.Item>
                  <h4>{i+1 + ". "} {"Team #" + item.teamNum}</h4>
                  <hr />
                  <h5>{"Score: " + item.finalScore}</h5>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </div>
    );
  }
}
