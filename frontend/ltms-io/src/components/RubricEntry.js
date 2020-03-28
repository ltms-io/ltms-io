import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

class RubricEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourneyId: "5e7c53f30c6d5700d3701567",
      teamId: "5e7f18462b37260116171336",
      dbresults: {},
      dbtournresults: {},
      dbteamresults: {},
      authresults: {},
      isHeadReferee: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
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

  render() {
    return(
      <div>
        <h1>Rubric Entry for {this.state.dbteamresults.teamName} in {this.state.dbtournresults.name}</h1>
        <div>
          <Form onSubmit={this.handleSubmit}>
            <div>
              <h3>Core Values</h3>
              <Container>
                <Row>
                  <h6>Inspiration</h6>
                  <Form.Group as="Col" controlId="formDiscovery">
                    <Form.Label>Discovery</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as="Col" controlId="formTeamIdentity">
                    <Form.Label>Team Identity</Form.Label>
                    <Form.Control required  as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as="Col" controlId="formImpact">
                    <Form.Label>Impact</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <h6>Teamwork</h6>
                  <Form.Group as="Col" controlId="formEffectiveness">
                    <Form.Label>Effectiveness</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as="Col" controlId="formEfficiency">
                    <Form.Label>Efficiency</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as="Col" controlId="formKidsDoTheWork">
                    <Form.Label>Kids Do the Work</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <h6>Gracious Professionalism®</h6>
                  <Form.Group as="Col" controlId="formInclusion">
                    <Form.Label>Inclusion</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as="Col" controlId="formRespect">
                    <Form.Label>Respect</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as="Col" controlId="formCoopertition">
                    <Form.Label>Coopertition®</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Form.Group controlId="formCoreValuesComments">
                  <Form.Label>Comments</Form.Label>
                  <Form.Control as="textarea" />
                </Form.Group>
              </Container>
            </div>
            <div>
              <h3>Innovation Project</h3>
              <Container>
                <Row>
                  <h6>Research</h6>
                  <Form.Group as="Col" controlId="formProblemIdentification">
                    <Form.Label>Problem Identification</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as="Col" controlId="formSourcesOfInformation">
                    <Form.Label>Sources of Information</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as="Col" controlId="formProblemAnalysis">
                    <Form.Label>Problem Analysis</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <h6>Innovative Solution</h6>
                  <Form.Group as="Col" controlId="formTeamSolution">
                    <Form.Label>Team Solution</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as="Col" controlId="formInnovation1">
                    <Form.Label>Innovation</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as="Col" controlId="formSolutionDevelopment">
                    <Form.Label>Solution Development</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <h6>Presentation</h6>
                  <Form.Group as="Col" controlId="formSharing">
                    <Form.Label>Sharing</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as="Col" controlId="formCreativity">
                    <Form.Label>Creativity</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as="Col" controlId="formPresentationEffectiveness">
                    <Form.Label>Presentation Effectiveness</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Form.Group controlId="formInnovationProjectComments">
                  <Form.Label>Comments</Form.Label>
                  <Form.Control as="textarea" />
                </Form.Group>
              </Container>
            </div>
            <div>
              <h3>Robot Design</h3>
              <Container>
                <Row>
                  <h6>Mechanical Design</h6>
                  <Form.Group as="Col" controlId="formDurability">
                    <Form.Label>Durability</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as="Col" controlId="formMechanicalEfficiency">
                    <Form.Label>Mechanical Efficiency</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as="Col" controlId="formMechanization">
                    <Form.Label>Mechanization</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <h6>Programming</h6>
                  <Form.Group as="Col" controlId="formProgrammingQuality">
                    <Form.Label>Programming Quality</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as="Col" controlId="formProgrammingEfficiency">
                    <Form.Label>Programming Efficiency</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as="Col" controlId="formAutomationNavigation">
                    <Form.Label>Automation/Navigation</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <h6>Strategy & Innovation</h6>
                  <Form.Group as="Col" controlId="formDesignProcess">
                    <Form.Label>Design Process</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as="Col" controlId="formMissionStrategy">
                    <Form.Label>Mission Strategy</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as="Col" controlId="formInnovation2">
                    <Form.Label>Innovation</Form.Label>
                    <Form.Control required as="select">
                      <option></option>
                      <option value="1">Beginning</option>
                      <option value="2">Developing</option>
                      <option value="3">Accomplished</option>
                      <option value="4">Exemplary</option>
                    </Form.Control>
                  </Form.Group>
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

    if (this.state.dbtournresults.headReferee === this.state.dbresults._id ||
        this.state.dbtournresults.director === this.state.dbresults._id) {
      this.state.isHeadReferee = true;
    }
    else {
      this.state.isHeadReferee = false;
    }

    this.setState(this.state);
  }
}

export default RubricEntry;
