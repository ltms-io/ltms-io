import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'

export default class TournamentDashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            tourneyId: this.props.match.params.tourneyId,
            name: null,
            startDate: null,
            endDate: null
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/tournaments/${this.state.tourneyId}`)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    startDate: res.data.startDate,
                    endDate: res.data.endDate
                });
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                console.log(this.state.dbresults)
            })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>{this.state.name}</h1>
                        <h3>{new Date(this.state.startDate).toLocaleDateString()} - {new Date(this.state.endDate).toLocaleDateString()}</h3>
                    </Col>

                    <Col>
                        <Button>Test Button</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}
