import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
          Auth-UID: { this.state.dbresults.auth0id }
        </div>
        <div>
          mongo-id: { this.state.dbresults._id }
        </div>
      </div>
    );
  }

  async componentDidMount() {
    // await axios({
    //   method: 'GET',
    //   url: `https://dev-s68c-q-y.auth0.com/userinfo`,
    //   headers: {
    //     'content-type': 'application/json',
    //     'authorization': 'Bearer ' + localStorage.getItem("access_token")
    //   },
    //   json: true
    // })
    // .then( (result) => {
    //   console.log("Auth info: ");
    //   console.log(result);
    //   this.setState({authresults: result.data});
    //   this.setState({uid: this.state.authresults.sub});
    // })
    // .catch( (error) => {
    //   console.log(error);
    // });

    // Use this statement instead once backend Auth0 connection for register
    // is complete (5e54b2a86efec099146c054b is random test uid):
    //await axios.get(`http://localhost:5000/api/users/5e54b2a86efec099146c054b`)
    await axios.post(`http://localhost:5000/api/users/auth`, {data: {sub: localStorage.getItem("auth0_id")}})
      .then ( (result) => {
        this.state.dbresults = result.data;
      })
      .catch( (error) => {
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
