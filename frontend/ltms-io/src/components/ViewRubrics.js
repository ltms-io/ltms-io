import React, { Component } from "react";
import { Form, Button, Card, CardColumns, ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "axios";
import { Link } from 'react-router-dom'
const jsonWeb = require('jsonwebtoken');

class ViewRubrics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "all-teams",
      dbresults: {},
      dbteamsresults: [],
      dbtournresults: {},
      tourneyId: this.props.match.params.tourneyId,
      isAuthorized: false
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(e) {
    e.preventDefault();
    this.setState({
      filter: e.target.elements.formFilter.value
    });

    console.log("UPDATED STATE", this.state);
  }

  render() {
    return (
      <div data-test="theViewRubrics">
        <h2 className="text-center pt-2">View Rubrics for "{this.state.dbtournresults.name}"</h2>
        {(this.state.isAuthorized) && (
          <div data-test="theFilter">
            <div className="pl-2">
              <h3>Filter by Team</h3>
              <Form onSubmit={this.handleFilter}>
                <Form.Group controlId="formFilter">
                  <Form.Label>Which team's rubrics do you want to view?</Form.Label>
                  <Form.Control required as="select">
                    <option data-test="anOption" value="all-teams">All teams</option>
                    {this.state.dbteamsresults.map( (item, i) => {
                      return (
                        <option data-test="anOption" value={i} key={i}>{item.teamName}</option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
                <Button type="submit">Filter</Button>
              </Form>
            </div>
            {this.state.filter === "all-teams" && (
              <div data-test="theCards">
                {this.state.dbteamsresults.map( (item1, i1) => {
                  return(
                    <div className="pl-2" key={i1}>
                      <h3>{item1.teamName}</h3>
                      <CardColumns>
                        {item1.rubrics.map( (item2, i2) => {
                          return(
                            <Card data-test="aCard" key={i2}>
                              <Card.Header><strong>{item2.username} - {item2.uniqueID}</strong></Card.Header>
                              <ListGroup className="list-group-flush">
                                <ListGroupItem>
                                  <Card.Title><strong>Core Values</strong></Card.Title>
                                  <Card.Text>
                                    <strong>Inspiration:</strong> (<em>Discovery:</em> {item2.coreValues.inspiration.discovery},
                                                                  <em> Team Identity:</em> {item2.coreValues.inspiration.teamIdentity},
                                                                  <em> Impact:</em> {item2.coreValues.inspiration.impact})
                                  </Card.Text>
                                  <Card.Text>
                                    <strong>Teamwork:</strong> (<em>Effectiveness:</em> {item2.coreValues.teamwork.effectiveness},
                                                                <em> Efficiency:</em> {item2.coreValues.teamwork.efficiency},
                                                                <em> Kids Do the Work:</em> {item2.coreValues.teamwork.kidsDoTheWork})
                                  </Card.Text>
                                  <Card.Text>
                                    <strong>Gracious Professionalism®:</strong> (<em>Inclusion:</em> {item2.coreValues.graciousProfessionalism.inclusion},
                                                                                <em> Respect:</em> {item2.coreValues.graciousProfessionalism.respect},
                                                                                <em> Coopertition®:</em> {item2.coreValues.graciousProfessionalism.coopertition})
                                  </Card.Text>
                                  <Card.Text>
                                    <strong>Comments:</strong> <em>{item2.coreValues.comments}</em>
                                  </Card.Text>
                                </ListGroupItem>
                                <ListGroupItem>
                                  <Card.Title><strong>Innovation Project</strong></Card.Title>
                                  <Card.Text>
                                    <strong>Research:</strong> (<em>Problem Identification:</em> {item2.innovationProject.research.problemIdentificaton},
                                                                <em> Sources of Information:</em> {item2.innovationProject.research.sourcesOfInformation},
                                                                <em> Problem Analysis:</em> {item2.innovationProject.research.problemAnalysis})<br/>
                                  </Card.Text>
                                  <Card.Text>
                                    <strong>Innovative Solution:</strong> (<em>Team Solution:</em> {item2.innovationProject.innovativeSolution.teamSolution},
                                                                          <em> Innovation:</em> {item2.innovationProject.innovativeSolution.innovation},
                                                                          <em> Solution Development:</em> {item2.innovationProject.innovativeSolution.solutionDevelopment})
                                  </Card.Text>
                                  <Card.Text>
                                    <strong>Presentation:</strong> (<em>Sharing:</em> {item2.innovationProject.presentation.sharing},
                                                                    <em> Creativity:</em> {item2.innovationProject.presentation.creativity},
                                                                    <em> Presentation Effectiveness:</em> {item2.innovationProject.presentation.presentationEffectiveness})
                                  </Card.Text>
                                  <Card.Text>
                                    <strong>Comments:</strong> <em>{item2.innovationProject.comments}</em><br/>
                                  </Card.Text>
                                </ListGroupItem>
                                <ListGroupItem>
                                  <Card.Title><strong>Robot Design</strong></Card.Title>
                                  <Card.Text>
                                    <strong>Mechanical Design:</strong> (<em>Durability:</em> {item2.robotDesign.mechanicalDesign.durability},
                                                                        <em> Mechanical Efficiency:</em> {item2.robotDesign.mechanicalDesign.mechanicalEfficiency},
                                                                        <em> Mechanization:</em> {item2.robotDesign.mechanicalDesign.mechanization})
                                  </Card.Text>
                                  <Card.Text>
                                    <strong>Programming:</strong> (<em>Programming Quality:</em> {item2.robotDesign.programming.programmingQuality},
                                                                  <em> Programming Efficiency:</em> {item2.robotDesign.programming.programmingEfficiency},
                                                                  <em> Automation/Navigation:</em> {item2.robotDesign.programming.automationNavigation})
                                  </Card.Text>
                                  <Card.Text>
                                    <strong>Strategy & Innovation:</strong> (<em>Design Process:</em> {item2.robotDesign.strategyInnovation.designProcess},
                                                                            <em> Mission Strategy:</em> {item2.robotDesign.strategyInnovation.missionStrategy},
                                                                            <em> Innovation:</em> {item2.robotDesign.strategyInnovation.innovation})
                                  </Card.Text>
                                  <Card.Text>
                                    <strong>Comments:</strong> <em>{item2.robotDesign.comments}</em>
                                  </Card.Text>
                                  <Link to={"/editrubrics/" + item1._id + "/" + item2.email + "/" + item2.uniqueID}>
                        <Button>Edit Rubric</Button>
                        </Link>
                                </ListGroupItem>
                              </ListGroup>
                            </Card>
                          );
                        })}
                      </CardColumns>
                      {item1.rubrics.length === 0 && (
                        <h6 className="text-secondary font-italic pl-2">No rubrics for this team</h6>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {this.state.filter !== "all-teams" && (
              <div data-test="theCards" className="pl-2">
                <h3>{this.state.dbteamsresults[parseInt(this.state.filter)].teamName}</h3>
                <CardColumns>
                  {this.state.dbteamsresults[parseInt(this.state.filter)].rubrics.map( (item2, i2) => {
                    return(
                      <Card key={i2}>
                        <Card.Header><strong>{item2.username} - {item2.uniqueID}</strong></Card.Header>
                        <ListGroup className="list-group-flush">
                          <ListGroupItem>
                            <Card.Title><strong>Core Values</strong></Card.Title>
                            <Card.Text>
                              <strong>Inspiration:</strong> (<em>Discovery:</em> {item2.coreValues.inspiration.discovery},
                                                            <em> Team Identity:</em> {item2.coreValues.inspiration.teamIdentity},
                                                            <em> Impact:</em> {item2.coreValues.inspiration.impact})
                            </Card.Text>
                            <Card.Text>
                              <strong>Teamwork:</strong> (<em>Effectiveness:</em> {item2.coreValues.teamwork.effectiveness},
                                                          <em> Efficiency:</em> {item2.coreValues.teamwork.efficiency},
                                                          <em> Kids Do the Work:</em> {item2.coreValues.teamwork.kidsDoTheWork})
                            </Card.Text>
                            <Card.Text>
                              <strong>Gracious Professionalism®:</strong> (<em>Inclusion:</em> {item2.coreValues.graciousProfessionalism.inclusion},
                                                                          <em> Respect:</em> {item2.coreValues.graciousProfessionalism.respect},
                                                                          <em> Coopertition®:</em> {item2.coreValues.graciousProfessionalism.coopertition})
                            </Card.Text>
                            <Card.Text>
                              <strong>Comments:</strong> <em>{item2.coreValues.comments}</em>
                            </Card.Text>
                          </ListGroupItem>
                          <ListGroupItem>
                            <Card.Title><strong>Innovation Project</strong></Card.Title>
                            <Card.Text>
                              <strong>Research:</strong> (<em>Problem Identification:</em> {item2.innovationProject.research.problemIdentificaton},
                                                          <em> Sources of Information:</em> {item2.innovationProject.research.sourcesOfInformation},
                                                          <em> Problem Analysis:</em> {item2.innovationProject.research.problemAnalysis})<br/>
                            </Card.Text>
                            <Card.Text>
                              <strong>Innovative Solution:</strong> (<em>Team Solution:</em> {item2.innovationProject.innovativeSolution.teamSolution},
                                                                    <em> Innovation:</em> {item2.innovationProject.innovativeSolution.innovation},
                                                                    <em> Solution Development:</em> {item2.innovationProject.innovativeSolution.solutionDevelopment})
                            </Card.Text>
                            <Card.Text>
                              <strong>Presentation:</strong> (<em>Sharing:</em> {item2.innovationProject.presentation.sharing},
                                                              <em> Creativity:</em> {item2.innovationProject.presentation.creativity},
                                                              <em> Presentation Effectiveness:</em> {item2.innovationProject.presentation.presentationEffectiveness})
                            </Card.Text>
                            <Card.Text>
                              <strong>Comments:</strong> <em>{item2.innovationProject.comments}</em><br/>
                            </Card.Text>
                          </ListGroupItem>
                          <ListGroupItem>
                            <Card.Title><strong>Robot Design</strong></Card.Title>
                            <Card.Text>
                              <strong>Mechanical Design:</strong> (<em>Durability:</em> {item2.robotDesign.mechanicalDesign.durability},
                                                                  <em> Mechanical Efficiency:</em> {item2.robotDesign.mechanicalDesign.mechanicalEfficiency},
                                                                  <em> Mechanization:</em> {item2.robotDesign.mechanicalDesign.mechanization})
                            </Card.Text>
                            <Card.Text>
                              <strong>Programming:</strong> (<em>Programming Quality:</em> {item2.robotDesign.programming.programmingQuality},
                                                            <em> Programming Efficiency:</em> {item2.robotDesign.programming.programmingEfficiency},
                                                            <em> Automation/Navigation:</em> {item2.robotDesign.programming.automationNavigation})
                            </Card.Text>
                            <Card.Text>
                              <strong>Strategy & Innovation:</strong> (<em>Design Process:</em> {item2.robotDesign.strategyInnovation.designProcess},
                                                                      <em> Mission Strategy:</em> {item2.robotDesign.strategyInnovation.missionStrategy},
                                                                      <em> Innovation:</em> {item2.robotDesign.strategyInnovation.innovation})
                            </Card.Text>
                            <Card.Text>
                              <strong>Comments:</strong> <em>{item2.robotDesign.comments}</em>
                            </Card.Text>

                          </ListGroupItem>
                        </ListGroup>
                      </Card>
                      
                    );
                  })}
                </CardColumns>
                {this.state.dbteamsresults[parseInt(this.state.filter)].rubrics.length === 0 && (
                  <h6 className="text-secondary font-italic pl-2">No rubrics for this team</h6>
                )}
              </div>
            )}
          </div>
        )}
        {!this.state.isAuthorized && (
          <h3 data-test="noAuthMsg">You are not authorized to view rubrics in this tournament.</h3>
        )}
      </div>
    );
  }

  async componentDidMount() {
    await axios.get(`/api/teams/tournid/${this.state.tourneyId}`)
    .then ( (res) => {
      this.state.dbteamsresults = res.data;
    });

    await axios.get(`/api/tournaments/${this.state.tourneyId}`)
    .then( (result) => {
      this.state.dbtournresults = result.data;
    }).catch( (error) => {
      console.log(error);
    });

    if (document.cookie.length) {
      var token = document.cookie.substring(13);
      var decoded = jsonWeb.verify(token, "123456");

      this.state.dbresults = decoded;
    }

    if (this.state.dbtournresults.director === this.state.dbresults._id) {
      this.state.isAuthorized = true;
    }
    else {
      for (var i = 0; i < this.state.dbtournresults.judgeAdvisor.length; i++) {
        if (this.state.dbtournresults.judgeAdvisor[i] === this.state.dbresults._id) {
          this.state.isAuthorized = true;
        }
      }
    }

    this.setState(this.state);

    console.log("INITIAL VIEW RUBRICS STATE", this.state);
  }
}

export default ViewRubrics;
