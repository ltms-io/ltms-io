import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

function changeGo(state, props) {
    return {
        go: true
    }
}

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      go: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
      if(!this.state.go)
      {
        this.myInterval = setInterval(() => {
            this.setState(prevState => ({
                counter: prevState.counter + 1
            }))
        }, 1000)
      }
  }
  componentWillUnmount(){
      clearInterval(this.myInterval)
  }
  handleSubmit = async event => {
    event.preventDefault()  
    this.setState(changeGo)
  }
  render() {
  return (
    <div>
        Timer: {this.state.counter}
        <Form onSubmit={this.handleSubmit}>
        <Button className="mt-5" type="submit">
            GO
          </Button>
    </Form>
    </div>
    );
  }
}
