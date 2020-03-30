import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export default class CreateJudges extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        tourneyID: this.props.match.params.tourneyId,
        users: []
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }
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
        }
    render() {
        return (
          <div>
            <Form onSubmit={this.handleSubmit}>
                <Button className="mt-5" type="submit" >
                    Display Users
                </Button>
            </Form>
            Users:
            <div>
            {this.state.users.map((item, i) => {
                {item.name}
            })}
            </div>
          </div>
        );
      }
}