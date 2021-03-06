import React, { Component } from 'react'
import { connect } from 'react-redux';
import { CardColumns, Card, Button, Container, Row, Col, Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsonWeb from 'jsonwebtoken';
import { SingleDatePicker } from 'react-dates';

class MainDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: null,
      errMsg: "",
      director: [],
      headReferee: [],
      judgeAdvisor: [],
      referee: [],
      judge: [],
      viewOnlyVol: []
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleVol = this.handleVol.bind(this);
  }

  async handleSearch(e) {
    e.preventDefault();

    const searchName = e.target.elements.tournament_name.value;
    const searchDate = this.state.date;
    const searchUser = e.target.elements.user_name.value;
    if (!searchName && !searchDate && !searchUser) {
      await this.setState({errMsg: "No search parameters!"});
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
    .then( async (res) => {
      await this.setState({results: res.data});
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
      window.location = `/tournamentdashboard/${id}`;
    })
    .catch( (err) => {
      console.log(err);
    });
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
    else {
      await axios({
        method: 'GET',
        url: `https://dev-s68c-q-y.auth0.com/userinfo`,
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem("access_token")
        },
        json: true
      })
      .then( async (result) => {
        await this.setState({uid: result.data.sub});
      })
      .catch( (error) => {
        console.log(error);
      });

      await axios.post(`/api/users/getuser`, {
        auth0id: this.state.uid
      }).then ( async (result) => {
        await this.setState({dbresults: result.data});
      }).catch( (error) => {
        console.log(error);
      });
    }

    await axios.post("/api/tournaments/user", {auth0id: this.state.uid})
    .then( async (res) => {
      await this.setState({
        director: res.data.director,
        headReferee: res.data.headReferee,
        judgeAdvisor: res.data.judgeAdvisor,
        referee: res.data.referee,
        judge: res.data.judge,
        viewOnlyVol: res.data.viewOnlyVol
      });
    })
    .catch( (err) => {
      console.log(err);
    });

    console.log("INITIAL MAIN DASHBOARD STATE", this.state);
  }

  render() {
    return (
      <div className="pl-3 pr-3 pt-2">
        <div>
          <h2 className="text-center pt-2">Find Tournaments</h2>
          <div>
            <Container>
              <Row className="my-1">
                <Col>
                  <Alert
                      variant="danger"
                      show={this.state.errMsg !== ''}
                      dismissible
                      onClose={() => {this.setState({errMsg: ''})}}>
                      {this.state.errMsg}
                  </Alert>
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
                        <SingleDatePicker
                            showClearDate
                            numberOfMonths={1}
                            date={this.state.date}
                            onDateChange={date => this.setState({ date })}
                            focused={this.state.focused}
                            onFocusChange={({ focused }) => this.setState({ focused })}
                            id="tourneyCreateDatePicker"
                        />
                      </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                      <Button variant="primary" type="submit">Submit</Button>
                    </Row>
                  </Form>
                </Col>
              </Row>
              {this.state.results && this.state.results !== 0 && (
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
              {this.state.results && this.state.results.length === 0 && (
                <h6 className="text-center text-secondary font-italic pt-2">No matching tournaments</h6>
              )}
            </Container>
          </div>
        </div>
        <hr />
        <div>
            <h2 className="text-center pt-2">Your Tournaments</h2>

            {this.state.director.length > 0 ?
            <div>
                <h3 className="pl-3">Tournament Director</h3>
                <CardColumns className="pl-5 mt-3">
                    {this.state.director.map((item, i) => {
                        return(
                            <Card key={item._id}>
                                <Card.Header>{item.name}</Card.Header>
                                <Card.Text className="m-3">
                                    Dates {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                                </Card.Text>
                                <Link to={"/tournamentdashboard/" + item._id} >
                                    <Button className="m-3">Access Tournament</Button>
                                </Link>
                            </Card>
                        );
                    })}
                </CardColumns>
                <hr />
            </div>
            : <></>}

            {this.state.headReferee.length > 0 ?
            <div>
                <h3 className="pl-3">Head Referee</h3>
                <CardColumns className="pl-5 mt-3">
                    {this.state.headReferee.map((item, i) => {
                        return(
                            <Card key={item._id}>
                                <Card.Header>{item.name}</Card.Header>
                                <Card.Text className="m-3">
                                    Dates {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                                </Card.Text>
                                <Link to={"/tournamentdashboard/" + item._id} >
                                    <Button className="m-3">Access Tournament</Button>
                                </Link>
                            </Card>
                        );
                    })}
                </CardColumns>
                <hr />
            </div>
            : <></>}

            {this.state.judgeAdvisor.length > 0 ?
            <div>
                <h3 className="pl-3">Judge Advisor</h3>
                <CardColumns className="pl-5 mt-3">
                    {this.state.judgeAdvisor.map((item, i) => {
                        return(
                            <Card key={item._id}>
                                <Card.Header>{item.name}</Card.Header>
                                <Card.Text className="m-3">
                                    Dates {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                                </Card.Text>
                                <Link to={"/tournamentdashboard/" + item._id} >
                                    <Button className="m-3">Access Tournament</Button>
                                </Link>
                            </Card>
                        );
                    })}
                </CardColumns>
                <hr />
            </div>
            : <></>}

            {this.state.referee.length > 0 ?
            <div>
                <h3 className="pl-3">Referee</h3>
                <CardColumns className="pl-5 mt-3">
                    {this.state.referee.map((item, i) => {
                        return(
                            <Card key={item._id}>
                                <Card.Header>{item.name}</Card.Header>
                                <Card.Text className="m-3">
                                    Dates {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                                </Card.Text>
                                <Link to={"/tournamentdashboard/" + item._id} >
                                    <Button className="m-3">Access Tournament</Button>
                                </Link>
                            </Card>
                        );
                    })}
                </CardColumns>
                <hr />
            </div>
            : <></>}

            {this.state.judge.length > 0 ?
            <div>
                <h3 className="pl-3">Judge</h3>
                <CardColumns className="pl-5 mt-3">
                    {this.state.judge.map((item, i) => {
                        return(
                            <Card key={item._id}>
                                <Card.Header>{item.name}</Card.Header>
                                <Card.Text className="m-3">
                                    Dates {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                                </Card.Text>
                                <Link to={"/tournamentdashboard/" + item._id} >
                                    <Button className="m-3">Access Tournament</Button>
                                </Link>
                            </Card>
                        );
                    })}
                </CardColumns>
                <hr />
            </div>
            : <></>}

            {this.state.viewOnlyVol.length > 0 ?
            <div>
                <h3 className="pl-3">View-Only Volunteer</h3>
                <CardColumns className="pl-5 mt-3">
                    {this.state.viewOnlyVol.map((item, i) => {
                        return(
                            <Card key={item._id}>
                                <Card.Header>{item.name}</Card.Header>
                                <Card.Text className="m-3">
                                    Dates {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                                </Card.Text>
                                <Link to={"/tournamentdashboard/" + item._id} >
                                    <Button className="m-3">Access Tournament</Button>
                                </Link>
                            </Card>
                        );
                    })}
                </CardColumns>
            </div>
            : <></>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        name: state.name,
        email: state.email,
        tournaments: state.tournaments
    }
};

export default connect(mapStateToProps)(MainDashboard);
