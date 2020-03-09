import React, { Component } from 'react'
import { SingleDatePicker } from 'react-dates'
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import TournamentCard from './TournamentCard';

function Results(props) {
    const resultsToShow = props.results;


    if (resultsToShow) {
        const cards = resultsToShow.map((datum) => 
            <Col key={datum._id}>
                <TournamentCard tournament={datum}/>
            </Col>
        )

        return (
            <Row>
                {cards}
            </Row>
        )
    }
}

export default class TournamentSearch extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            date: null,
            errMsg: "",
            results: [],
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
                    <Row>
                        <Card>
                            <Results results={this.state.results}/>
                        </Card>
                    </Row>
                </Container>
            </div>
        )
    }

    async handleSearch(e) {
        e.preventDefault();

        
        const searchName = e.target.elements.tournament_name.value;
        const searchDate = this.state.date;
        const searchUser = e.target.elements.user_name.value;

        if (!searchName && searchDate != null && !searchUser) {
            this.setState({errMsg: "No search parameters!"});
            return;
        }

        console.log(`tourneyname: ${searchName}`);
        console.log(`tourneydate: ${searchDate}`);
        console.log(`user name: ${searchUser}`);
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

        console.log(req);

        await axios.post('http://localhost:5000/api/tournaments/search', req).then((res) => {
            console.log(res.data);
            this.setState({results: res.data});
        }).then((err) => {
            if (err)
                console.log(err);
        });
    }
}
