import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export default class ViewRubrics extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          teams: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = event => {
        axios.get("http://localhost:5000/api/teams/")
          .then(res => {
            console.log(res);
            window.location = "/dashboard";
          })
          .catch(err => {
            console.log(err);
          });
        }
    render() {
        const elements = ['one','two','three'];
        for(const [i,v] of elements.entries()){
            this.state.teams.push(<li key={i}>{v}</li>)
        }
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Button>
                        Display Rubrics
                    </Button>
                </Form>
                {this.state.teams}
            </div>
        )
    }
}