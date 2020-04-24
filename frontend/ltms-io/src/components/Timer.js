import React, { Component } from "react";
import { Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import Sound from 'react-sound';
import audio from '../ENDMATCH.mp3';

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
      go: false,
      canSound: true
    };

    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(e){
    e.preventDefault();
    await this.setState({
      counter: (parseInt(this.state.min,10) * 60000) + (parseInt(this.state.sec,10) * 1000),
      initalCounter: (parseInt(this.state.min,10) * 60000) + (parseInt(this.state.sec,10) * 1000)
    })
  };

  async handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    await this.setState({ [name]: value });
  };

  async startTimer(){
    await this.setState({
      counter: this.state.counter,
      start: Date.now() + this.state.counter,
      go: true
    })
    this.timer = setInterval(() => this.setState({
      counter: this.state.start - Date.now()
    }), 1);
  }

  async stopTimer() {
    await this.setState({go: false})
    clearInterval(this.timer)
  }

  async resetTimer() {
    await this.setState({
      counter: this.state.initalCounter,
      canSound: true
    })
  }

  async componentDidMount() {
    await this.setState({counter: 150000})
  }

  render() {
    return (
      <div className="pl-3 pr-3 pt-2 text-center">
        {(this.state.counter <= 0 && this.state.canSound) && (
          <Sound
            url={audio}
            playStatus={Sound.status.PLAYING}
            onFinishedPlaying={() => this.setState({canSound: false})} />
        )}

        <h1>Timer</h1>
        <ListGroup className="pb-2">
          {this.state.counter > 0 && (
            <ListGroup.Item><h1 style={{fontSize:"100px"}}>{ms(this.state.counter)}</h1></ListGroup.Item>
          )}
          {this.state.counter <= 0 && (
            <ListGroup.Item variant="danger"><h1 style={{fontSize:"100px"}}>0</h1></ListGroup.Item>
          )}
        </ListGroup>
        <Button className="ml-1 mr-1" disabled={!(this.state.counter === this.state.initalCounter)} onClick={this.startTimer}>start</Button>
        <Button className="ml-1 mr-1" disabled={!this.state.go} onClick={this.stopTimer}>stop</Button>
        <Button className="ml-1 mr-1" disabled={!(!(this.state.counter === this.state.initalCounter) && !this.state.go)} onClick={this.resetTimer}>reset</Button>
        <Button className="ml-1 mr-1" disabled={!(!(this.state.counter === this.state.initalCounter) && !this.state.go)} onClick={this.startTimer}>resume</Button>
        <hr />
        <Form onSubmit={this.handleSubmit}>
          <h4 className="pb-1">Input time</h4>
          <Row>
            <Col>
              <Form.Control
                  required
                  placeholder="min"
                  name="min"
                  onChange={this.handleChange}
                />
              </Col>
            <Col>
              <Form.Control
                required
                placeholder="sec"
                name="sec"
                onChange={this.handleChange}
              />
            </Col>
          </Row>
          <Button disabled={!(this.state.counter === this.state.initalCounter)} className="mt-3" type="submit">
            Input Time
          </Button>
        </Form>
      </div>
    );
  }
}
