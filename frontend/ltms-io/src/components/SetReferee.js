import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import PropTypes from "prop-types";
import jsonWeb from 'jsonwebtoken';
import { Pacman } from 'react-pure-loaders';
import LoadingOverlay from 'react-loading-overlay';

class SetReferee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourneyId: this.props.match.params.tourneyId,
      uid: "",
      dbresults: {},
      dbtournresults: {},
      isAuthorized: false,
      uploading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    e.persist();
    await this.setState({
      uploading: true
    });
    var strings = e.target.elements.users.value.split(",");
    var ids = [];
    var message = "";

    var waiting1 = new Promise( (resolve, reject) => {
      strings.forEach( async (item, index) => {
        var temp = item;
        temp = temp.trim();
        await axios.post(`/api/users/search`, {
          email: temp
        })
        .then( (result) => {
          ids[index] = result.data._id;
          if (this.state.dbtournresults.referees.includes(ids[index])) {
            message += ("User " + temp + " already is a referee.\n");
            ids[index] = "DNE";
          }
          if (index === strings.length - 1) {
            resolve();
          }

          window.location = `/tournamentdashboard/${this.state.tourneyId}`
        })
        .catch( (error) => {
          message += ("There was an error finding user " + temp + ".\n");
          ids[index] = "DNE";
          console.log(error);
          if (index === strings.length - 1) {
            resolve();
          }
        });
      });
    });

    waiting1.then( () => {
      message += "\n";

      var waiting2 = new Promise( (resolve, reject) => {
        ids.forEach( async (item, index) => {
          var temp = item;
          await axios.patch(`/api/tournaments/${this.state.tourneyId}`, {
            referee: temp
          })
          .then( () => {
            if (index === ids.length - 1) {
              resolve();
            }
          })
          .catch( (error) => {
            if (temp !== "DNE") {
              message += ("There was an error adding user ID " + temp + " to the database.\n");
            }
            console.log(error);
            if (index === ids.length - 1) {
              resolve();
            }
          });
        });
      });

      waiting2.then( async () => {
        this.updateState();
        console.log("UPDATED STATE", this.state);

        await this.setState({
          uploading: false
        });

        if (alert(message)) {
          window.location = `/tournamentdashboard/${this.state.tourneyId}`;
        }
        else {
          window.location = `/tournamentdashboard/${this.state.tourneyId}`;
        }
      });
    });
  }

  async updateState() {
    if (document.cookie.length) {
      var token = document.cookie.substring(13);
      var decoded = jsonWeb.verify(token, "123456");

      await this.setState({
        dbresults: decoded,
        uid: decoded.auth0id
      });
    }

    await axios.get(`/api/tournaments/${this.state.tourneyId}`)
    .then( async (result) => {
      await this.setState({
        dbtournresults: result.data
      });
    })
    .catch( (error) => {
      console.log(error);
    });

    if (this.state.dbtournresults.headReferee.includes(this.state.dbresults._id) ||
        this.state.dbtournresults.director === this.state.dbresults._id) {
      await this.setState({
        isAuthorized: true
      })
    }
  }

  async componentDidMount() {
    await this.updateState();
    console.log("INITIAL SET REFEREE STATE", this.state);
  }

  render() {
    return(
      <LoadingOverlay active={this.state.uploading} spinner={<Pacman loading color="black" />} text='Loading...' >
        <div data-test="theComponent" className="pl-3 pr-3 pt-2">
          <h1 data-test="theMainHeader">Set Referees for Tournament "{this.state.dbtournresults.name}"</h1>
          <div>
            {this.state.isAuthorized && (
              <Form data-test="theForm" onSubmit={this.handleSubmit}>
                <Form.Group controlId="users">
                  <Form.Label>Enter user(s) below</Form.Label>
                  <Form.Control type="text" placeholder="Enter user email(s) separated by commas" />
                </Form.Group>
                <Button type="submit">Submit</Button>
              </Form>
            )}
            {!this.state.isAuthorized && (
              <h3 data-test="noAuthMsg">You are not authorized for set referees in this tournament.</h3>
            )}
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

SetReferee.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      tourneyId: PropTypes.string
    })
  })
}

export default SetReferee;
