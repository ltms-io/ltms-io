import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export default class ViewRubrics extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          teams: [],
          tourneyId: this.props.match.params.tourneyId 
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = async event => {
        event.preventDefault()
        console.log("HELLOO")
        const elements = ['one','two','three'];
        for(const [i,v] of elements.entries()){
            this.state.teams.push(<li key={i}>{v}</li>)
        }
        await axios.get("http://localhost:5000/api/teams/tournid/" + this.state.tourneyId)
          .then(res => {
            console.log(res);
            this.state.teams = res.data
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
                        Display Rubrics
                    </Button>
                </Form>
                {this.state.tourneyId}
                <div>
                {this.state.teams.map((item, i) => {
                              return(
                                item.teamName
                              );
                            })}
                </div>
            </div>
            
        )
    }
}