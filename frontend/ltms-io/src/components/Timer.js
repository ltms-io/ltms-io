import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

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
      start: 0,
      go: false
    };
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }

  startTimer(){
    this.setState({
      counter: this.state.counter,
      start: Date.now() - this.state.counter,
      go: true
    })
    this.timer = setInterval(() => this.setState({
      counter: Date.now() - this.state.start
    }), 1);
  }
  stopTimer() {
    this.setState({go: false})
    clearInterval(this.timer)
  }
  resetTimer() {
    this.setState({counter: 0})
  }
  /*componentDidMount(){
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
  }*/
  render() {

    let start = (this.state.counter == 0) ?
    <button onClick={this.startTimer}>start</button>:
    null

    let stop = (this.state.go) ?
    <button onClick={this.stopTimer}>stop</button>:
    null

    let reset = (this.state.coutner != 0 && !this.state.go) ?
    <button onClick={this.resetTimer}>reset</button>:
    null

    let resume = (this.state.coutner != 0 && !this.state.go) ?
    <button onClick={this.startTimer}>resume</button>:
    null
  
  
    return (
    <div>
        <h3>timer: {this.state.counter}</h3>
        {start}
        {resume}
        {stop}
        {reset}
    </div>
    );
  }
}
