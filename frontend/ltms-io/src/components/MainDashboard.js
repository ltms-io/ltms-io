import React, { Component } from 'react'
import { connect } from 'react-redux';
import { CardColumns } from 'react-bootstrap';

class MainDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <h2 className="text-center pt-2">Your Tournaments</h2>
                <CardColumns>
                    {/* map function */}
                </CardColumns>
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