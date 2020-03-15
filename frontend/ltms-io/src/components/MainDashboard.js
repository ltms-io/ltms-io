import React, { Component } from 'react'
import { connect } from 'react-redux';
import { CardColumns } from 'react-bootstrap';
import axios from 'axios';

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
        axios.post("http://localhost:5000/api/tournaments/user", {data: {auth0id: localStorage.getItem("auth0_id")}})
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
                <hr />
                {/* <CardColumns>
                    //map function
                </CardColumns> */}
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