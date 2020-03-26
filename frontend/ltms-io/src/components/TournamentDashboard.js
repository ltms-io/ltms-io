import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'

export default class TournamentDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tourneyId: this.props.match.params.tourneyId.substring(1),
            dbresults: {},
            dbtournresults: {},
            authresults: {},
            setRefereeAuthorized: false
        }

        this.updateState = this.updateState.bind(this);
    }

    async componentDidMount() {
        await this.updateState();
        console.log("INITIAL TOURNAMENT DASHBOARD STATE", this.state);

        if (this.state.dbtournresults.headReferee === this.state.dbresults._id ||
            this.state.dbtournresults.director === this.state.dbresults._id) {
          this.state.setRefereeAuthorized = true;
        }
        else {
          this.state.setRefereeAuthorized = false;
        }

        this.setState(this.state);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>{this.state.dbtournresults.name}</h1>
                        <h3>{new Date(this.state.dbtournresults.startDate).toLocaleDateString()} - {new Date(this.state.dbtournresults.endDate).toLocaleDateString()}</h3>
                    </Col>

                    <Col>
                        {this.state.setRefereeAuthorized && (
                          <Button href={"/setreferee/:" + this.state.tourneyId}>Set Referee</Button>
                        )}
                        {!this.state.setRefereeAuthorized && (
                          <Button href={"/setreferee/:" + this.state.tourneyId} disabled>Set Referee</Button>
                        )}
                    </Col>
                </Row>
            </Container>
        );
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
      })
      .then( (result) => {
        this.state.authresults = result.data;
      })
      .catch( (error) => {
        console.log(error);
      });

      await axios.post(`http://localhost:5000/api/users/getuser`, {
        auth0id: this.state.authresults.sub
      }).then ( (result) => {
          this.state.dbresults = result.data;
      }).catch( (error) => {
          console.log(error);
      });

      // CURRENTLY USING A PLACEHOLDER TOURNAMENT FOR TESTING
      // TODO: get the tournament id selected from dashboard and use this id in
      // the get request
      await axios.get(`http://localhost:5000/api/tournaments/${this.state.tourneyId}`)
      .then( (result) => {
          this.state.dbtournresults = result.data;
      }).catch( (error) => {
          console.log(error);
      });

      this.setState(this.state);
    }
}
