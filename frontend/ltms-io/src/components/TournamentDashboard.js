import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class TournamentDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tourneyId: this.props.match.params.tourneyId,
            dbresults: {},
            dbtournresults: {},
            dbteamnames: [],
            authresults: {},
            setRefereeAuthorized: false,
            rubricEntryAuthorized: false
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

        if (this.state.dbtournresults.director === this.state.dbresults._id) {
          this.state.rubricEntryAuthorized = true;
        }
        else {
          for (var i = 0; i < this.state.dbtournresults.judgeAdvisor.length; i++) {
            if (this.state.dbtournresults.judgeAdvisor[i] === this.state.dbresults._id) {
              this.state.rubricEntryAuthorized = true;
            }
          }
          if (!this.state.isAuthorized) {
            for (var i = 0; i < this.state.dbtournresults.judges.length; i++) {
              if (this.state.dbtournresults.judges[i] === this.state.dbresults._id) {
                this.state.rubricEntryAuthorized = true;
              }
            }
          }
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
                        <Link to={"/setreferee/" + this.state.tourneyId}>
                            <Button disabled={!this.state.setRefereeAuthorized}>Set Referee</Button>
                        </Link>
                        {this.state.dbtournresults.teams && (
                          <div>
                            {this.state.dbtournresults.teams.map( (item, i) => {
                                return(
                                    <Link to={"/rubricentry/" + this.state.tourneyId + "/" + item}>
                                        <Button disabled={!this.state.rubricEntryAuthorized}>Rubric Entry for {this.state.dbteamnames[i]}</Button>
                                    </Link>
                                );
                            })}
                          </div>
                        )}
                        {true && ( //TODO set to head ref only
                          <Link to={"/t/" + this.state.tourneyId + "/mscores"}>
                            <Button>See Scores</Button>
                          </Link>
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

      await axios.get(`http://localhost:5000/api/tournaments/${this.state.tourneyId}`)
      .then( (result) => {
          this.state.dbtournresults = result.data;
      }).catch( (error) => {
          console.log(error);
      });

      for (var i = 0; i < this.state.dbtournresults.teams.length; i++) {
        await axios.get(`http://localhost:5000/api/teams/${this.state.dbtournresults.teams[i]}`)
        .then( (result) => {
            this.state.dbteamnames[i] = result.data.teamName;
        }).catch( (error) => {
            console.log(error);
        });
      }

      this.setState(this.state);
      console.log(this.state);
    }
}
