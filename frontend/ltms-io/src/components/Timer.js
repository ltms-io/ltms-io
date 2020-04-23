import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

const ms = require('pretty-ms')

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      initalCounter: 150000,
      start: 0,
      min: 0,
      sec: 0,
      go: false
    };
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(e){
    e.preventDefault();
    this.setState({
      counter: (parseInt(this.state.min,10) * 60000) + (parseInt(this.state.sec,10) * 1000),
      initalCounter: (parseInt(this.state.min,10) * 60000) + (parseInt(this.state.sec,10) * 1000)
    })
  };
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };
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
        <button disabled = {!(this.state.counter === this.state.initalCounter)} onClick={this.startTimer}>start</button>
        <button disabled = {!this.state.go} onClick={this.stopTimer}>stop</button>
        <button disabled={!(!(this.state.counter === this.state.initalCounter) && !this.state.go)} onClick={this.resetTimer}>reset</button>
        <button disabled={!(!(this.state.counter === this.state.initalCounter) && !this.state.go)} onClick={this.startTimer}>resume</button>
        <Form onSubmit={this.handleSubmit}>
        <Form.Label>Input time</Form.Label>
        <Form.Control
            required
            placeholder="min"
            name="min"
            onChange={this.handleChange}
          />
          <Form.Control
            required
            placeholder="sec"
            name="sec"
            onChange={this.handleChange}
          />
          <Button disabled = {!(this.state.counter === this.state.initalCounter)} className="mt-5" type="submit">
            Input time
          </Button>
        </Form>
    </div>
    );
  }
}
