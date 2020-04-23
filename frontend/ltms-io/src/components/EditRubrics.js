import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";

export default class EditRubrics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      tourneyId: this.props.match.params.tourneyId,
      teamId: this.props.match.params.teamId,
      email: this.props.match.params.email,
      uniqueID: this.props.match.params.uniqueID,
      username: this.props.match.params.username,
      gotrubric: null,
      dbteamsresults: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(e) {
    e.preventDefault();
    e.persist()
    await axios.patch(`/api/teams/rubricdelete/${this.state.teamId}`, {
      email: this.state.email,
      uniqueID: this.state.uniqueID
    })
    .catch( (error) => {
      console.log(error);
    });
    var rubric = {
      username: this.state.username,
      email: this.state.email,
      uniqueID: this.state.uniqueID,
      coreValues: {
        inspiration: {
          discovery: e.target.elements.formDiscovery.value,
          teamIdentity: e.target.elements.formTeamIdentity.value,
          impact: e.target.elements.formImpact.value
        },
        teamwork: {
          effectiveness: e.target.elements.formEffectiveness.value,
          efficiency: e.target.elements.formEfficiency.value,
          kidsDoTheWork: e.target.elements.formKidsDoTheWork.value
        },
        graciousProfessionalism: {
          inclusion: e.target.elements.formInclusion.value,
          respect: e.target.elements.formRespect.value,
          coopertition: e.target.elements.formCoopertition.value
        },
        comments: e.target.elements.formCoreValuesComments.value
      },
      innovationProject: {
        research: {
          problemIdentificaton: e.target.elements.formProblemIdentification.value,
          sourcesOfInformation: e.target.elements.formSourcesOfInformation.value,
          problemAnalysis: e.target.elements.formProblemAnalysis.value
        },
        innovativeSolution: {
          teamSolution: e.target.elements.formTeamSolution.value,
          innovation: e.target.elements.formInnovation1.value,
          solutionDevelopment: e.target.elements.formSolutionDevelopment.value
        },
        presentation: {
          sharing: e.target.elements.formSharing.value,
          creativity: e.target.elements.formCreativity.value,
          presentationEffectiveness: e.target.elements.formPresentationEffectiveness.value
        },
        comments: e.target.elements.formInnovationProjectComments.value
      },
      robotDesign: {
        mechanicalDesign: {
          durability: e.target.elements.formDurability.value,
          mechanicalEfficiency: e.target.elements.formMechanicalEfficiency.value,
          mechanization: e.target.elements.formMechanization.value
        },
        programming: {
          programmingQuality: e.target.elements.formProgrammingQuality.value,
          programmingEfficiency: e.target.elements.formProgrammingEfficiency.value,
          automationNavigation: e.target.elements.formAutomationNavigation.value
        },
        strategyInnovation: {
          designProcess: e.target.elements.formDesignProcess.value,
          missionStrategy: e.target.elements.formMissionStrategy.value,
          innovation: e.target.elements.formInnovation2.value
        },
        comments: e.target.elements.formRobotDesignComments.value
      }
    };
    await axios.patch(`/api/teams/${this.state.teamId}`, {
      rubric: rubric
    })
    .then( (res) => {
      window.location = `/viewrubrics/` + this.state.tourneyId;
    })
    .catch( (error) => {
      console.log(error);
    });
  }
  async componentDidMount() {
    await axios.post(`/api/teams/rubricget/${this.state.teamId}`, {
      email: this.state.email,
      uniqueID: this.state.uniqueID
    }
    )
    .then ( (res) => {
      this.setState({gotrubric: res.data});
    });
    console.log(this.state.gotrubric)
    console.log(this.state.gotrubric.coreValues.inspiration.discovery)
  }
  render() {
  return (
  <div>
    {this.state.gotrubric && (
      <div>
  <h3>Rubric Edit for {this.state.username} - {this.state.uniqueID}</h3>
              <Form data-test="theSubmitForm" onSubmit={this.handleSubmit}>
                <div>
                  <h4>Core Values</h4>
                  <Container>
                    <Row>
                      <h6>Inspiration</h6>
                      <Col>
                        <Form.Group data-test="anInput" controlId="formDiscovery">
                          <Form.Label>Discovery</Form.Label>
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.coreValues.inspiration.discovery}>
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
                          <Form.Control required  as="select" defaultValue = {this.state.gotrubric.coreValues.inspiration.teamIdentity}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.coreValues.inspiration.impact}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.coreValues.teamwork.effectiveness}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.coreValues.teamwork.efficiency}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.coreValues.teamwork.kidsDoTheWork}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.coreValues.graciousProfessionalism.inclusion}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.coreValues.graciousProfessionalism.respect}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.coreValues.graciousProfessionalism.coopertition}>
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
                      <Form.Control as="textarea" defaultValue = {this.state.gotrubric.coreValues.comments}/>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.innovationProject.research.problemIdentificaton}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.innovationProject.research.sourcesOfInformation}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.innovationProject.research.problemAnalysis}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.innovationProject.innovativeSolution.teamSolution}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.innovationProject.innovativeSolution.innovation}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.innovationProject.innovativeSolution.solutionDevelopment}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.innovationProject.presentation.sharing}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.innovationProject.presentation.creativity}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.innovationProject.presentation.presentationEffectiveness}>
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
                      <Form.Control as="textarea" defaultValue = {this.state.gotrubric.innovationProject.comments}/>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.robotDesign.mechanicalDesign.durability}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.robotDesign.mechanicalDesign.mechanicalEfficiency}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.robotDesign.mechanicalDesign.mechanization}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.robotDesign.programming.programmingQuality}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.robotDesign.programming.programmingEfficiency}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.robotDesign.programming.automationNavigation}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.robotDesign.strategyInnovation.designProcess}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.robotDesign.strategyInnovation.missionStrategy}>
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
                          <Form.Control required as="select" defaultValue = {this.state.gotrubric.robotDesign.strategyInnovation.innovation}>
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
                      <Form.Control as="textarea" defaultValue = {this.state.gotrubric.robotDesign.comments}/>
                    </Form.Group>
                  </Container>
                </div>
                <Button type="submit">
                  Submit Rubric
                </Button>
              </Form>
              </div>
    )}
  </div>
  );
  }
}
