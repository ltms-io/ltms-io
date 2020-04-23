import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import axios from 'axios';
const jsonWeb = require('jsonwebtoken');

export default class MatchScoreListing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tourneyId: this.props.match.params.tourneyId,
      uid: "",
      dbresults: {},
      dbscoreresults: []
    }

    this.updateState = this.updateState.bind(this);
  }

  async updateState() {
    if (document.cookie.length) {
      var token = document.cookie.substring(13);
      var decoded = jsonWeb.verify(token, "123456");

      await this.setState({
        dbresults: decoded,
        uid: decoded.auth0id
      });
    }

    await axios.get(`/api/tournaments/${this.state.tourneyId}/scores`)
    .then( async (res) => {
      await this.setState({
        dbscoreresults: res.data
      });
    })
    .catch( (err) => {
      console.log(err);
    });

    console.log("UPDATED STATE");
    console.log(this.state);
  }

  async componentDidMount() {
    await this.updateState();
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Match Scores</h1>
        {this.state.dbscoreresults && (
          <ListGroup>
            {this.state.dbscoreresults.map( (item, i) => {
              return (
                <ListGroup.Item action href={`/t/${this.state.tourneyId}/editscore/${item._id}`}>
                  <h4>Match: {item._id}</h4>
                  <hr />
                  <h5>Final Score: {item.finalScore}</h5>
                  <h5 className="text-right">Team: {item.teamNum}</h5>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </div>
    );
  }
}
