import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export default class CreateJudges extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        tourneyID: this.props.match.params.tourneyId,
        users: [],
        userID: null
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handlePush = this.handlePush.bind(this);
    }
    handleChange = event => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({ [name]: value });
    };
    handleSubmit = async event => {
        event.preventDefault()
        await axios.get("http://localhost:5000/api/users/")
          .then(res => {
            console.log(res);
            this.state.users = res.data
          })
          .catch(err => {
            console.log(err);
          });
          this.setState(this.state)
          console.log(this.state.users)
        }
        handlePush = async event => {
          event.preventDefault()
          console.log(this.state.userID)
          console.log(this.state.tourneyID)
          await axios.patch(`http://localhost:5000/api/tournaments/${this.state.tourneyID}`, {
        judge: this.state.userID
      })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
            
            await axios.get(`http://localhost:5000/api/tournaments/${this.state.tourneyID}`)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
        };
    render() {
        return (
          <div>
            <Form onSubmit={this.handleSubmit}>
                <Button className="mt-5" type="submit" >
                    Display Users
                </Button>
            </Form>
            Users/UserID:
            <div>
            {this.state.users.map((item, i) => {
                return(
                    <div>
                      {item.name}: {item._id}
                    </div>
                )
            })}
            </div>
            <div>
              <Form onSubmit={this.handlePush}>
          <Form.Label>Judge ID</Form.Label>
          <Form.Control
            required
            placeholder="Judge ID"
            name="userID"
            onChange={this.handleChange}
          />
                <Button className="mt-5" type="submit">
                  Input Judge ID
                </Button>
              </Form>
            </div>
          </div>
        );
      }
}