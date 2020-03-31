import React, { Component } from 'react'
import { connect } from 'react-redux';
import { CardColumns, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsonWeb from 'jsonwebtoken';

class MainDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            director: [],
            headReferee: [],
            judgeAdvisor: [],
            referee: [],
            judge: [],
            viewOnlyVol: []
        }
    }

    componentDidMount() {
        var token = document.cookie.substring(13);
        var decoded = jsonWeb.verify(token, "123456");
        axios.post("http://localhost:5000/api/tournaments/user", {auth0id: decoded.auth0id})
            .then(res => {
                this.setState({
                    director: res.data.director,
                    headReferee: res.data.headReferee,
                    judgeAdvisor: res.data.judgeAdvisor,
                    referee: res.data.referee,
                    judge: res.data.judge,
                    viewOnlyVol: res.data.viewOnlyVol
                });
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                console.log(this.state);
            })
    }

    render() {
        return (
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
                                        <p>Dates {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}</p>
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
                                        <p>Dates {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}</p>
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
                                        <p>Dates {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}</p>
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
                                        <p>Dates {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}</p>
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
                                        <p>Dates {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}</p>
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
                    <h3 className="pl-3">View Only</h3>
                    <CardColumns className="pl-5 mt-3">
                        {this.state.viewOnlyVol.map((item, i) => {
                            return(
                                <Card key={item._id}>
                                    <Card.Header>{item.name}</Card.Header>
                                    <Card.Text className="m-3">
                                        <p>Dates {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}</p>
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
            </div>
        )
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
