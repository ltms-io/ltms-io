import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";

export default class EditRubrics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      teamId: this.props.match.params.teamId,
      email: this.props.match.params.email,
      uniqueID: this.props.match.params.uniqueID,
      rubric: [],
      dbteamsresults: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(e) {
    await axios.patch(`/api/teams/rubricdelete/${this.state.teamId}`, {
      email: this.state.email,
      uniqueID: this.state.uniqueID
    })
    .catch( (error) => {
      console.log(error);
    });
  }
  async componentDidMount() {
    /*console.log(this.state);
    await axios.post(`/api/teams/rubricget/${this.state.teamId}`, {
      email: this.state.email,
      uniqueID: this.state.uniqueID
    }
    )
    .then ( (res) => {
      this.setState({rubric: res.data});
    });
    console.log(this.state.rubric)*/
  }
  render() {
  return (
  <div>
  <h3>Rubric Edit for {this.state.email} - {this.state.uniqueID}</h3>
              <Form data-test="theSubmitForm" onSubmit={this.handleSubmit}>
                <div>
                  <h4>Core Values</h4>
                  <Container>
                    <Row>
                      <h6>Inspiration</h6>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formDiscovery">
                          <Form.Label>Discovery</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formTeamIdentity">
                          <Form.Label>Team Identity</Form.Label>
                          <Form.Control required  as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formImpact">
                          <Form.Label>Impact</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <h6>Teamwork</h6>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formEffectiveness">
                          <Form.Label>Effectiveness</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formEfficiency">
                          <Form.Label>Efficiency</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formKidsDoTheWork">
                          <Form.Label>Kids Do the Work</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <h6>Gracious Professionalism®</h6>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formInclusion">
                          <Form.Label>Inclusion</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formRespect">
                          <Form.Label>Respect</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formCoopertition">
                          <Form.Label>Coopertition®</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group data-test="aCommentInput" controlId="formCoreValuesComments">
                      <Form.Label>Comments</Form.Label>
                      <Form.Control as="textarea" />
                    </Form.Group>
                  </Container>
                </div>
                <div>
                  <h4>Innovation Project</h4>
                  <Container>
                    <Row>
                      <h6>Research</h6>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formProblemIdentification">
                          <Form.Label>Problem Identification</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formSourcesOfInformation">
                          <Form.Label>Sources of Information</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formProblemAnalysis">
                          <Form.Label>Problem Analysis</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <h6>Innovative Solution</h6>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formTeamSolution">
                          <Form.Label>Team Solution</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formInnovation1">
                          <Form.Label>Innovation</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formSolutionDevelopment">
                          <Form.Label>Solution Development</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <h6>Presentation</h6>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formSharing">
                          <Form.Label>Sharing</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formCreativity">
                          <Form.Label>Creativity</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formPresentationEffectiveness">
                          <Form.Label>Presentation Effectiveness</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group data-test="aCommentInput" controlId="formInnovationProjectComments">
                      <Form.Label>Comments</Form.Label>
                      <Form.Control as="textarea" />
                    </Form.Group>
                  </Container>
                </div>
                <div>
                  <h4>Robot Design</h4>
                  <Container>
                    <Row>
                      <h6>Mechanical Design</h6>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formDurability">
                          <Form.Label>Durability</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formMechanicalEfficiency">
                          <Form.Label>Mechanical Efficiency</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formMechanization">
                          <Form.Label>Mechanization</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <h6>Programming</h6>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formProgrammingQuality">
                          <Form.Label>Programming Quality</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formProgrammingEfficiency">
                          <Form.Label>Programming Efficiency</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formAutomationNavigation">
                          <Form.Label>Automation/Navigation</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <h6>Strategy & Innovation</h6>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formDesignProcess">
                          <Form.Label>Design Process</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formMissionStrategy">
                          <Form.Label>Mission Strategy</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formInnovation2">
                          <Form.Label>Innovation</Form.Label>
                          <Form.Control required as="select">
                            <option></option>
                            <option value="1">Beginning</option>
                            <option value="2">Developing</option>
                            <option value="3">Accomplished</option>
                            <option value="4">Exemplary</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group data-test="aCommentInput" controlId="formRobotDesignComments">
                      <Form.Label>Comments</Form.Label>
                      <Form.Control as="textarea" />
                    </Form.Group>
                  </Container>
                </div>
                <Button type="submit">
                  Submit Rubric
                </Button>
              </Form>
  </div>
  );
  }
}
