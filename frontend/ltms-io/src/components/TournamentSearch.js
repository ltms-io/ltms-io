import React, { Component } from 'react'
import { SingleDatePicker } from 'react-dates'
import { Form, Button, Container, Row, Col, Alert, CardColumns, Card } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
const jsonWeb = require('jsonwebtoken');


export default class TournamentSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: null,
            errMsg: "",
        };

        this.handleSearch = this.handleSearch.bind(this);
      }


    render() {
        return (
            <div>
                <Container>
                    <Row className="my-1">
                        <Col>
                        <Alert
                            variant="danger"
                            show={this.state.errMsg != ''}
                            dismissible
                            onClose={() => {this.setState({errMsg: ''})}}>
                            {this.state.errMsg}</Alert>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form onSubmit={this.handleSearch}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="tournament_name">
                                        <Form.Control placeholder="Tournament Name"/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="user_name">
                                        <Form.Control placeholder="Director Name"/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        {/* <Form.Group controlId="date">
                                        <Form.Control type="date" placeholder="date"/>
                                        </Form.Group> */}
                                        <SingleDatePicker
                                            showClearDate
                                            numberOfMonths="1"
                                            date={this.state.date}
                                            onDateChange={date => this.setState({ date })}
                                            focused={this.state.focused}
                                            onFocusChange={({ focused }) => this.setState({ focused })}
                                            id="tourneyCreateDatePicker"
                                        />
                                    </Col>
                                </Row>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                    {this.state.results && (
                      <Row>
                        <CardColumns className="pl-5 mt-3">
                            {this.state.results.map( (item, i) => {
                                return(
                                    <Card key={item._id}>
                                        <Card.Header>{item.name}</Card.Header>
                                        <Card.Text className="m-3">
                                            <p>Dates {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}</p>
                                        </Card.Text>
                                        {(item.director === this.state.dbresults._id || item.headReferee.includes(this.state.dbresults._id) || item.judgeAdvisor.includes(this.state.dbresults._id) || item.referees.includes(this.state.dbresults._id) || item.judges.includes(this.state.dbresults._id) || item.viewOnlyVols.includes(this.state.dbresults._id)) && (
                                          <Link to={"/tournamentdashboard/" + item._id} >
                                              <Button className="m-3">Access Tournament</Button>
                                          </Link>
                                        )}
                                        {(item.director !== this.state.dbresults._id && !item.headReferee.includes(this.state.dbresults._id) && !item.judgeAdvisor.includes(this.state.dbresults._id) && !item.referees.includes(this.state.dbresults._id) && !item.judges.includes(this.state.dbresults._id) && !item.viewOnlyVols.includes(this.state.dbresults._id)) && (
                                          <Button className="m-3" onClick={() => this.handleVol(item._id)}>Register as a Volunteer</Button>
                                        )}
                                    </Card>
                                );
                            })}
                        </CardColumns>
                      </Row>
                    )}
                </Container>
            </div>
        )
    }

    async componentDidMount() {
      if (document.cookie.length) {
        var token = document.cookie.substring(13);
        var decoded = jsonWeb.verify(token, "123456");

        this.state.dbresults = decoded;
        this.state.uid = decoded.auth0id;
      }

      console.log("INITIAL TOURNAMENT SEARCH STATE", this.state);
    }

    async handleSearch(e) {
      e.preventDefault();

      const searchName = e.target.elements.tournament_name.value;
      const searchDate = this.state.date;
      const searchUser = e.target.elements.user_name.value;
      if (!searchName && !searchDate && !searchUser) {
        this.setState({errMsg: "No search parameters!"});
        return;
      }

      var req = {};
      if (searchName) {
        req.tournament_name = searchName;
      }
      if (searchDate) {
        req.date = searchDate;
      }
      if (searchUser) {
        req.user_name = searchUser;
      }

      await axios.post('/api/tournaments/search', req)
      .then( (res) => {
        this.setState({results: res.data});
        console.log(this.state);
      })
      .catch( (err) => {
        console.log(err);
      });
    }

    async handleVol(id) {
      await axios.patch(`/api/tournaments/${id}`, {
        viewOnlyVol: this.state.dbresults._id
      })
      .then( (res) => {
        console.log(res);
        window.location = `/tournamentdashboard/${id}`;
      })
      .catch( (err) => {
        console.log(err);
      });
    }
}
