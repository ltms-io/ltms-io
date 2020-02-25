import React from 'react';
import {connect} from 'react-redux';
import {Form, Button, Col, Row} from 'react-bootstrap';

class Sheet extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      modal: false,
      events: [],
      finalscore: 0
    }

    this.handleInsert = this.handleInsert.bind(this);
  }

  handleInsert(e) {
    e.preventDefault();
    var newScore = 0;
    
    if(parseInt(e.target.elements.scoring1.value, 10)){
      newScore += parseInt(e.target.elements.scoring1.value, 10);
    }
    
    if(parseInt(e.target.elements.scoring2.value, 10)){
      newScore += parseInt(e.target.elements.scoring2.value, 10);
    }

    if(parseInt(e.target.elements.scoring3.value, 10)){
      newScore += parseInt(e.target.elements.scoring3.value, 10);
    }
    
    if(parseInt(e.target.elements.scoring4.value, 10)){
      newScore += parseInt(e.target.elements.scoring4.value, 10);
    }

    if(parseInt(e.target.elements.scoring5.value, 10)){
      newScore += parseInt(e.target.elements.scoring5.value, 10);
    }

    if(parseInt(e.target.elements.scoring6.value, 10)){
      newScore += parseInt(e.target.elements.scoring6.value, 10);
    }

    if(parseInt(e.target.elements.scoring7.value, 10)){
      newScore += parseInt(e.target.elements.scoring7.value, 10);
    }

    if(parseInt(e.target.elements.scoring8.value, 10)){
      newScore += parseInt(e.target.elements.scoring8.value, 10);
    }

    if(parseInt(e.target.elements.scoring9.value, 10)){
      newScore += parseInt(e.target.elements.scoring9.value, 10);
    }

    if(parseInt(e.target.elements.scoring10.value, 10)){
      newScore += parseInt(e.target.elements.scoring10.value, 10);
    }

    this.setState({finalscore: newScore});
    // var newArray = [...this.state.events];
    // newArray.push({
    //   categ: e.target.elements.category.value,
    //   scoretype: e.target.elements.score.value
    // })
    // this.setState({events: newArray})
    


    /*var s = <Form.Control type = "text"> {e.target.elements.category.value}</Form.Control>;
    cats.push(s);
    score.push(e.target.elements.score.value);*/
  }
    
  render(){
    return(
      // <div>
      //   <h3>Add a category</h3>
      //   <Form onSubmit={this.handleInsert}>
      //     <Row>
      //       <Col>
      //     <Form.Group controlId = "category">
      //       <Form.Control type = "text" placeholder = "Category"/>
      //     </Form.Group>
      //     </Col>
      //     <Col>
      //     <Form.Group controlId = "score">
      //       <Form.Control type = "text" placeholder = "Score Type"/>
      //     </Form.Group>
      //     </Col>
      //     </Row>
      //     <Button variant = "outline-primary" type = "submit">
      //       Add Category
      //     </Button>
      //   </Form>
      //   <Form>
      //     {this.state.events.map(event => (
      //       <Cate
      //       categ = {event.categ}
      //       />
      //     ))}
      //   </Form>
      // </div>
      <div>
        <h3>Team Scoring</h3>
        <Form onSubmit = {this.handleInsert}>
          <Row>
            <Col>
              <Form.Group controlId = "category1">
                <Form.Control type = "text" placeholder = "Category"/>
              </Form.Group>
            </Col>
            <Col xs = "3">
              <Form.Group controlId = "scoring1">
                <Form.Control type = "text" placeholder = "Score"/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId = "category2">
                <Form.Control type = "text" placeholder = "Category"/>
              </Form.Group>
            </Col>
            <Col xs = "3">
              <Form.Group controlId = "scoring2">
                <Form.Control type = "text" placeholder = "Score"/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId = "category3">
                <Form.Control type = "text" placeholder = "Category"/>
              </Form.Group>
            </Col>
            <Col xs = "3">
              <Form.Group controlId = "scoring3">
                <Form.Control type = "text" placeholder = "Score"/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId = "category4">
                <Form.Control type = "text" placeholder = "Category"/>
              </Form.Group>
            </Col>
            <Col xs = "3">
              <Form.Group controlId = "scoring4">
                <Form.Control type = "text" placeholder = "Score"/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId = "category5">
                <Form.Control type = "text" placeholder = "Category"/>
              </Form.Group>
            </Col>
            <Col xs = "3">
              <Form.Group controlId = "scoring5">
                <Form.Control type = "text" placeholder = "Score"/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId = "category6">
                <Form.Control type = "text" placeholder = "Category"/>
              </Form.Group>
            </Col>
            <Col xs = "3">
              <Form.Group controlId = "scoring6">
                <Form.Control type = "text" placeholder = "Score"/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId = "category7">
                <Form.Control type = "text" placeholder = "Category"/>
              </Form.Group>
            </Col>
            <Col xs = "3">
              <Form.Group controlId = "scoring7">
                <Form.Control type = "text" placeholder = "Score"/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId = "category8">
                <Form.Control type = "text" placeholder = "Category"/>
              </Form.Group>
            </Col>
            <Col xs = "3">
              <Form.Group controlId = "scoring8">
                <Form.Control type = "text" placeholder = "Score"/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId = "category9">
                <Form.Control type = "text" placeholder = "Category"/>
              </Form.Group>
            </Col>
            <Col xs = "3">
              <Form.Group controlId = "scoring9">
                <Form.Control type = "text" placeholder = "Score"/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId = "category10">
                <Form.Control type = "text" placeholder = "Category"/>
              </Form.Group>
            </Col>
            <Col xs = "3">
              <Form.Group controlId = "scoring10">
                <Form.Control type = "text" placeholder = "Score"/>
              </Form.Group>
            </Col>
          </Row>
          <Button variant = "outline-primary" type = "submit">
             Calculate Score
          </Button>
        </Form>
        <Form>
          <Row>
            <Col xs = "1">Final Score</Col>
            <Col xs = "2">
              <Form.Control type = "text" placeholder = {this.state.finalscore} readonly = "true"/>
            </Col>
          </Row>
        </Form>
      </div>
    ); 
  }
}

// class Cate extends React.Component{
//   render(){
//     return (
//       <div>
//         <Form>
//           <Row>
//             <Col>
//               <Form.Control type = "text" placeholder = {this.props.finalscore} readonly = "true"/>
//             </Col>
//             <Col xs = "3">
//               <Form.Control type = "text" placeholder = "Enter Score"/>
//             </Col>
//           </Row>
//         </Form>
//       </div>
//     );
//   }
// }

export default Sheet;