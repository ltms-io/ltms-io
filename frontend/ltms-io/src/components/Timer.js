import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

const ms = require('pretty-ms')

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      initalCounter: 0,
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
  render() {
    return (
    <div>
        <h3>Timer: {ms(this.state.counter)}</h3>
        <button disabled={!this.state.counter == 0} onClick={this.startTimer}>start</button>
        <button disabled={!this.state.go} onClick={this.stopTimer}>stop</button>
        <button disabled={!(this.state.coutner != 0 && !this.state.go)} onClick={this.resetTimer}>reset</button>
        <button disabled={!(this.state.coutner != 0 && !this.state.go)} onClick={this.startTimer}>resume</button>
    </div>
    );
  }
}
