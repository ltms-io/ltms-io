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
      dbtournresults: {},
      dbscoreresults: [],
      isAuthorized: false
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
    .then( async (res) => {
      await this.setState({
        dbscoreresults: res.data
      });
    })
    .catch( (err) => {
      console.log(err);
    });

    if (this.state.dbtournresults.headReferee.includes(this.state.dbresults._id) ||
        this.state.dbtournresults.director === this.state.dbresults._id) {
      await this.setState({
        isAuthorized: true
      })
    }

    console.log("UPDATED STATE");
    console.log(this.state);
  }

  async componentDidMount() {
    await this.updateState();
  }

  render() {
    return (
      <div className="pl-3 pr-3 pt-2">
        <h1 className="pl-1 pb-2">View Match Scores for Tournament "{this.state.dbtournresults.name}"</h1>
        {this.state.isAuthorized && (
          <div>
            {this.state.dbscoreresults && (
              <ListGroup>
                {this.state.dbscoreresults.map( (item, i) => {
                  return (
                    <ListGroup.Item action href={`/t/${this.state.tourneyId}/editscore/${item._id}`}>
                      <h4>Match ID: {item._id}</h4>
                      <hr />
                      <h5>Final Score: {item.finalScore}</h5>
                      <h5 className="text-right">Team #{item.teamNum}</h5>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            )}
          </div>
        )}
        {!this.state.isAuthorized && (
          <h3>You are not authorized to view match scores in this tournament.</h3>
        )}
      </div>
    );
  }
}
