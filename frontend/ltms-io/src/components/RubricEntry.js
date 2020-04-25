import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import PropTypes from "prop-types";
import jsonWeb from 'jsonwebtoken';
import { Pacman } from 'react-pure-loaders';
import LoadingOverlay from 'react-loading-overlay';

/*
The rubric structure used here is based off of the Sep. 3 2019 (City Shaper 2019
challenge) version of the official judging rubrics provided by FLL. It can be
found here: https://www.firstinspires.org/resource-library/fll/judging-rubrics
*/
class RubricEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourneyId: this.props.match.params.tourneyId,
      teamId: this.props.match.params.teamId,
      uid: "",
      dbresults: {},
      dbtournresults: {},
      dbteamresults: {},
      isAuthorized: false,
      isSendAuthorized: false,
      uploading1: false,
      uploading2: false,
      uploading3: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    e.persist();
    await this.setState({
      uploading3: true
    });
    var rubric = {
      username: this.state.dbresults.name,
      email: this.state.dbresults.email,
      uniqueID: e.target.elements.formUniqueID.value,
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
    .catch( (error) => {
      console.log(error);
    });

    this.updateState();
    console.log("UPDATED STATE", this.state);

    await this.setState({
      uploading3: false
    });
  }

  async handleDelete(e) {
    e.preventDefault();
    e.persist();
    await this.setState({
      uploading2: true
    });

    var parsed = JSON.parse(e.target.elements.formDelete.value);
    await axios.patch(`/api/teams/rubricdelete/${this.state.teamId}`, {
      email: parsed.email,
      uniqueID: parsed.uniqueID
    })
    .catch( (error) => {
      console.log(error);
    });

    this.updateState();
    console.log("UPDATED STATE", this.state);

    await this.setState({
      uploading2: false
    });
  }

  async handleSend(e) {
    e.preventDefault();
    e.persist();
    await this.setState({
      uploading1: true
    });

    await axios.post(`/api/teams/sendrubrics/${this.state.teamId}`, {
      email: e.target.elements.sendEmail.value,
      tournName: this.state.dbtournresults.name
    })
    .catch( (error) => {
      console.log(error);
    });

    this.updateState();
    console.log("UPDATED STATE", this.state);

    await this.setState({
      uploading1: false
    });
  }

  async updateState() {
    if (document.cookie.length) {
      var token = document.cookie.substring(13);
      var decoded = jsonWeb.verify(token, "123456");

      await this.setState({
        dbresults: decoded,
        uid: decoded.auth0id
      });
    }

    await axios.get(`/api/tournaments/${this.state.tourneyId}`)
    .then( async (result) => {
      await this.setState({
        dbtournresults: result.data
      });
    })
    .catch( (error) => {
        console.log(error);
    });

    await axios.get(`/api/teams/${this.state.teamId}`)
    .then( async (result) => {
      await this.setState({
        dbteamresults: result.data
      });
    })
    .catch( (error) => {
        console.log(error);
    });

    if (this.state.dbtournresults.director === this.state.dbresults._id ||
        this.state.dbtournresults.judgeAdvisor.includes(this.state.dbresults._id)) {
      await this.setState({
        isAuthorized: true,
        isSendAuthorized: true
      });
    }
    if (this.state.dbtournresults.judges.includes(this.state.dbresults._id)) {
      await this.setState({
        isAuthorized: true
      });
    }

    if (this.state.isSendAuthorized) {
      await this.setState({
        dbrubricsresults: this.state.dbteamresults.rubrics
      });
    }
    else {
      var rubrics = [];
      this.state.dbteamresults.rubrics.forEach( (item) => {
        if (item.email === this.state.dbresults.email) {
          rubrics.push(item);
        }
      });
      await this.setState({
        dbrubricsresults: rubrics
      });
    }
  }

  async componentDidMount() {
    await this.updateState();
    console.log("INITIAL RUBRIC ENTRY STATE", this.state);
  }

  render() {
    return(
      <div data-test="theComponent" className="pl-3 pr-3 pt-2">
        <h1 data-test="theMainHeader" className="pb-1">Rubric Entry for Team "{this.state.dbteamresults.teamName}" in Tournament "{this.state.dbtournresults.name}"</h1>
        {this.state.isSendAuthorized && (
          <LoadingOverlay active={this.state.uploading1} spinner={<Pacman loading color="black" />} text='Loading...' >
            <div>
              <div>
                <h3>Send All Rubrics to Team</h3>
                <Form data-test="theSendForm" onSubmit={this.handleSend}>
                  <Form.Group controlId="sendEmail">
                    <Form.Label>What email should the rubrics be sent to?</Form.Label>
                    <Form.Control placeholder="Enter the email address" />
                  </Form.Group>
                  <Button type="submit">
                    Send Email
                  </Button>
                </Form>
              </div>
              <hr />
            </div>
          </LoadingOverlay>
        )}
        {this.state.isAuthorized && (
          <div className="pb-3">
            <LoadingOverlay active={this.state.uploading2} spinner={<Pacman loading color="black" />} text='Loading...' >
              <div>
                <h3>Rubric Deletion</h3>
                <Form data-test="theDeleteForm" onSubmit={this.handleDelete}>
                  <Form.Group controlId="formDelete">
                    <Form.Label>Which rubric do you want to delete?</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      {this.state.dbrubricsresults && (
                        this.state.dbrubricsresults.map( (item, i) => {
                          return (
                            <option data-test="aDeleteOption" value={"{\"email\": \"" + item.email + "\", \"uniqueID\": \"" + item.uniqueID + "\"}"} key={i}>{item.username} - {item.uniqueID}</option>
                          );
                        })
                      )}
                    </Form.Control>
                  </Form.Group>
                  <Button variant="danger" type="submit">
                    Delete Rubric
                  </Button>
                </Form>
              </div>
            </LoadingOverlay>
            <hr />
            <LoadingOverlay active={this.state.uploading3} spinner={<Pacman loading color="black" />} text='Loading...' >
              <div>
                <h3>Rubric Submission</h3>
                <Form data-test="theSubmitForm" onSubmit={this.handleSubmit}>
                  <Form.Group data-test="anInput" controlId="formUniqueID">
                    <Form.Label>Unique ID/Name</Form.Label>
                    <Form.Control required type="text" />
                  </Form.Group>
                  <div>
                    <h4 className="pb-1">Core Values</h4>
                    <Container>
                      <Row>
                        <Col>
                          <h6>Inspiration</h6>
                        </Col>
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
                        <Col>
                          <h6>Teamwork</h6>
                        </Col>
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
                        <Col>
                          <h6>Gracious Professionalism®</h6>
                        </Col>
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
                    <h4 className="pb-1">Innovation Project</h4>
                    <Container>
                      <Row>
                        <Col>
                          <h6>Research</h6>
                        </Col>
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
                        <Col>
                          <h6>Innovative Solution</h6>
                        </Col>
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
                        <Col>
                          <h6>Presentation</h6>
                        </Col>
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
                    <h4 className="pb-1">Robot Design</h4>
                    <Container>
                      <Row>
                        <Col>
                          <h6>Mechanical Design</h6>
                        </Col>
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
                        <Col>
                          <h6>Programming</h6>
                        </Col>
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
                        <Col>
                          <h6>Strategy & Innovation</h6>
                        </Col>
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
            </LoadingOverlay>
          </div>
        )}
        {!this.state.isAuthorized && (
          <h3 data-test="noAuthMsg">You are not authorized for rubric entry in this tournament.</h3>
        )}
      </div>
    );
  }
}

RubricEntry.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      tourneyId: PropTypes.string,
      teamId: PropTypes.string
    })
  })
}

export default RubricEntry;
