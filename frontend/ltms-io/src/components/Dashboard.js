import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      uid: "",
      dbresults: {},
      authresults: {}
    };
  }

  render () {
    return(
      <div>
        <div>
          Email: { this.state.dbresults.email }
        </div>
        <div>
          Name: { this.state.dbresults.name }
        </div>
        <div>
          UID: { this.state.uid }
        </div>
      </div>
    );
  }

  async componentDidMount() {
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
      this.state.uid = this.state.authresults.sub;
    })
    .catch( (error) => {
      console.log(error);
    });

    await axios.post(`http://localhost:5000/api/users/getuser`, {
      auth0id: this.state.uid
    }).then ( (result) => {
        this.state.dbresults = result.data;
    }).catch( (error) => {
        console.log(error);
    });

    this.setState(this.state);

    console.log("INITIAL DASHBOARD STATE", this.state);
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.name,
    email: state.email,
    tournaments: state.tournaments
  }
};

export default connect(mapStateToProps)(Dashboard);
