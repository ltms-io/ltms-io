import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

function handleGo(e) {
    e.preventDefault();
    this.setState(handleTrue);
}
function handleTrue(state, props){
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
  render() {
  return (
    <div>
        Timer: {this.state.counter}
        <button onClick={handleGo}>
            GO
        </button>
    </div>
    );
  }
}
