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
      initalCounter: 150000,
      start: 0,
      go: false
    };
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
  componentDidMount() {
    this.setState({counter: 150000})
  }
  startTimer(){
    this.setState({
      counter: this.state.counter,
      start: Date.now() + this.state.counter,
      go: true
    })
    this.timer = setInterval(() => this.setState({
      counter: this.state.start - Date.now()
    }), 1);
  }
  stopTimer() {
    this.setState({go: false})
    clearInterval(this.timer)
  }
  resetTimer() {
    this.setState({counter: this.state.initalCounter})
  }
  render() {
    return (
    <div>
        <h3>Timer: {ms(this.state.counter)}</h3>
        <button disabled = {!(this.state.counter == this.state.initalCounter)} onClick={this.startTimer}>start</button>
        <button disabled = {!this.state.go} onClick={this.stopTimer}>stop</button>
        <button disabled={!(!(this.state.counter == this.state.initalCounter) && !this.state.go)} onClick={this.resetTimer}>reset</button>
        <button disabled={!(!(this.state.counter == this.state.initalCounter) && !this.state.go)} onClick={this.startTimer}>resume</button>
    </div>
    );
  }
}
