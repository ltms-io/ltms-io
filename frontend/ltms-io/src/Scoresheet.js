import React from 'react';
import {connect} from 'react-redux';
import {Form, Button, Col, Row} from 'react-bootstrap';

var cats = [];
var score = [];

class Sheet extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      modal: false,
      events: [{
        categ: "this"
      }]
    }
  }

  handleInsert(e) {
    e.preventDefault();
    var newArray = [...this.state.events];
    newArray.push({
      categ: e.target.elements.category.value,
    })
    this.setState({events: newArray})
    
    /*var s = <Form.Control type = "text"> {e.target.elements.category.value}</Form.Control>;
    cats.push(s);
    score.push(e.target.elements.score.value);*/
  }
    
  render(){
    return(
      <div>
        <h3>Add a category</h3>
        <Form onSubmit={this.handleInsert}>
          <Row>
            <Col>
          <Form.Group controlId = "category">
            <Form.Control type = "text" placeholder = "Category"/>
          </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId = "score">
            <Form.Control type = "text" placeholder = "Score Type"/>
          </Form.Group>
          </Col>
          </Row>
          <Button variant = "outline-primary" type = "submit">
            Add Category
          </Button>
        </Form>
        <Form>
          {this.state.events.map(event => (
            <Cate
            categ = {event.categ}
            />
          ))}
        </Form>
      </div>
    ); 
  }
}

class Cate extends React.Component{
  render(){
    return (
      <div>
        {this.props.categ}
      </div>
    );
  }
}

export default Sheet;