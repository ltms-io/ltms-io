import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

class RubricEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourneyId: this.props.match.params.tourneyId,
      teamId: this.props.match.params.teamId,
      dbresults: {},
      dbtournresults: {},
      dbteamresults: {},
      authresults: {},
      isAuthorized: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    var rubric = {
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
    await axios.patch(`http://localhost:5000/api/teams/${this.state.teamId}`, {
      rubric: rubric
    })
    .catch( (error) => {
      console.log(error);
    });

    this.updateState();
    console.log("UPDATED STATE", this.state);

    alert("Submitted!");
  }

  async handleDelete(e) {
    e.preventDefault();
    if (e.target.elements.deleteInd.value < 0 ||
        e.target.elements.deleteInd.value >= this.state.dbteamresults.rubrics.length) {
      alert("Invalid Index");
    }
    else {
      await axios.patch(`http://localhost:5000/api/teams/rubricdelete/${this.state.teamId}`, {
        index: e.target.elements.deleteInd.value
      })
      .catch( (error) => {
        console.log(error);
      });

      this.updateState();
      console.log("UPDATED STATE", this.state);

      alert("Deleted!");
    }
  }

  async updateState() {
    await axios({
      method: 'GET',
      url: `https://dev-s68c-q-y.auth0.com/userinfo`,
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem("access_token")
      },
      json: true
    })
    .then( (result) => {
      this.state.authresults = result.data;
    })
    .catch( (error) => {
      console.log(error);
    });

    await axios.post(`http://localhost:5000/api/users/getuser`, {
      auth0id: this.state.authresults.sub
    }).then ( (result) => {
        this.state.dbresults = result.data;
    }).catch( (error) => {
        console.log(error);
    });

    await axios.get(`http://localhost:5000/api/tournaments/${this.state.tourneyId}`)
    .then( (result) => {
        this.state.dbtournresults = result.data;
    }).catch( (error) => {
        console.log(error);
    });

    await axios.get(`http://localhost:5000/api/teams/${this.state.teamId}`)
    .then( (result) => {
        this.state.dbteamresults = result.data;
    }).catch( (error) => {
        console.log(error);
    });

    this.setState(this.state);
  }

  render() {
    return(
      <div>
        <h1>Rubric Entry for Team "{this.state.dbteamresults.teamName}" in Tournament "{this.state.dbtournresults.name}"</h1>
        {this.state.isAuthorized && (
          <div>
            <div>
              <h3>Rubric Deletion</h3>
              <Form onSubmit={this.handleDelete}>
                <Form.Group controlId="deleteInd">
                  <Form.Label>Which rubric do you want to delete?</Form.Label>
                  <Form.Control placeholder="Enter the zero-based index # of the rubric" />
                </Form.Group>
                <Button variant="danger" type="submit">
                  Delete Rubric
                </Button>
              </Form>
            </div>
            <div>
              <h3>Rubric Submission</h3>
              <Form onSubmit={this.handleSubmit}>
                <div>
                  <h4>Core Values</h4>
                  <Container>
                    <Row>
                      <h6>Inspiration</h6>
                      <Col>
                        <Form.Group controlId="formDiscovery">
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
                        <Form.Group controlId="formTeamIdentity">
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
                        <Form.Group controlId="formImpact">
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
                        <Form.Group controlId="formEffectiveness">
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
                        <Form.Group controlId="formEfficiency">
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
                        <Form.Group controlId="formKidsDoTheWork">
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
                        <Form.Group controlId="formInclusion">
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
                        <Form.Group controlId="formRespect">
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
                        <Form.Group controlId="formCoopertition">
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
                    <Form.Group controlId="formCoreValuesComments">
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
                        <Form.Group controlId="formProblemIdentification">
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
                        <Form.Group controlId="formSourcesOfInformation">
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
                        <Form.Group controlId="formProblemAnalysis">
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
                        <Form.Group controlId="formTeamSolution">
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
                        <Form.Group controlId="formInnovation1">
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
                        <Form.Group controlId="formSolutionDevelopment">
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
                        <Form.Group controlId="formSharing">
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
                        <Form.Group controlId="formCreativity">
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
                        <Form.Group controlId="formPresentationEffectiveness">
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
                    <Form.Group controlId="formInnovationProjectComments">
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
                        <Form.Group controlId="formDurability">
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
                        <Form.Group controlId="formMechanicalEfficiency">
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
                        <Form.Group controlId="formMechanization">
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
                        <Form.Group controlId="formProgrammingQuality">
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
                        <Form.Group controlId="formProgrammingEfficiency">
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
                        <Form.Group controlId="formAutomationNavigation">
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
                        <Form.Group controlId="formDesignProcess">
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
                        <Form.Group controlId="formMissionStrategy">
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
                        <Form.Group controlId="formInnovation2">
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
                    <Form.Group controlId="formRobotDesignComments">
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
          </div>
        )}
        {!this.state.isAuthorized && (
          <h3>You are not authorized for rubric entry in this tournament.</h3>
        )}
      </div>
    );
  }

  async componentDidMount() {
    await axios.get(`http://localhost:5000/api/users`)
    .then ( (result) => {
        console.log("USERS", result.data);
    })
    .catch( (error) => {
        console.log(error);
    });
    await axios.get(`http://localhost:5000/api/tournaments`)
    .then ( (result) => {
        console.log("TOURNAMENTS", result.data);
    })
    .catch( (error) => {
        console.log(error);
    });
    await axios.get(`http://localhost:5000/api/teams`)
    .then ( (result) => {
        console.log("ALL TEAMS", result.data);
    })
    .catch( (error) => {
        console.log(error);
    });
    await axios.get(`http://localhost:5000/api/teams/tournid/${this.state.tourneyId}`)
    .then ( (result) => {
        console.log(`ALL TEAMS FROM ${this.state.tourneyId}`, result.data);
    })
    .catch( (error) => {
        console.log(error);
    });

    await this.updateState();
    console.log("INITIAL RUBRIC ENTRY STATE", this.state);

    if (this.state.dbtournresults.director === this.state.dbresults._id) {
      this.state.isAuthorized = true;
    }
    else {
      for (var i = 0; i < this.state.dbtournresults.judgeAdvisor.length; i++) {
        if (this.state.dbtournresults.judgeAdvisor[i] === this.state.dbresults._id) {
          this.state.isAuthorized = true;
        }
      }
      if (!this.state.isAuthorized) {
        for (var i = 0; i < this.state.dbtournresults.judges.length; i++) {
          if (this.state.dbtournresults.judges[i] === this.state.dbresults._id) {
            this.state.isAuthorized = true;
          }
        }
      }
    }

    this.setState(this.state);
  }
}

export default RubricEntry;
