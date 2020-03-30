import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export default class ViewRubrics extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          teams: [],
          tourneyId: this.props.match.params.tourneyId 
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = async event => {
        event.preventDefault()
        await axios.get("http://localhost:5000/api/teams/tournid/" + this.state.tourneyId)
          .then(res => {
            console.log(res);
            this.state.teams = res.data
          })
          .catch(err => {
            console.log(err);
          });
          this.setState(this.state)
        }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Button className="mt-5" type="submit" >
                        Display Rubrics
                    </Button>
                </Form>
                Tournament ID: {this.state.tourneyId}
                <div>
                {this.state.teams.map((item1, i1) => {
                              return(
                                <div>
                                  {item1.teamName}
                                  {item1.rubrics.map((item2, i2) => {
                                    return(
                                      <div>
                                        Rubric {i2 + 1}:
                                        <div>
                                          Core Values
                                          <div>
                                            Inspiration - (discovery: {item2.coreValues.inspiration.discovery} , team identity: {item2.coreValues.inspiration.teamIdentity} , impact: {item2.coreValues.inspiration.impact})
                                          </div>
                                          <div>
                                            Teamwork - (effectiveness: {item2.coreValues.teamwork.effectiveness} , efficiency: {item2.coreValues.teamwork.efficiency} , kids do the work: {item2.coreValues.teamwork.kidsDoTheWork})
                                          </div>
                                          <div>
                                            Gracious Professionalism - (inclusion: {item2.coreValues.graciousProfessionalism.inclusion} , respect: {item2.coreValues.graciousProfessionalism.respect} , cooperation: {item2.coreValues.graciousProfessionalism.coopertition})
                                          </div>
                                          <div>
                                             Comments: {item2.coreValues.comments}
                                          </div>
                                        </div>
                                        <div>
                                          Innovation Project
                                          <div>
                                            Research - (problem identification: {item2.innovationProject.research.problemIdentification} , sources of information: {item2.innovationProject.research.sourcesOfInformation} , problem analysis: {item2.innovationProject.research.problemAnalysis})
                                          </div>
                                          <div>
                                            Innovative Solution - (team solution: {item2.innovationProject.innovativeSolution.teamSolution} , innovation: {item2.innovationProject.innovativeSolution.innovation} , solution development: {item2.innovationProject.innovativeSolution.solutionDevelopment})
                                          </div>
                                          <div>
                                            Presentation - (sharing: {item2.innovationProject.presentation.sharing} , creativity: {item2.innovationProject.presentation.creativity} , presentation effectiveness: {item2.innovationProject.presentation.presentationEffectiveness})
                                          </div>
                                          <div>
                                          Comments: {item2.innovationProject.comments}
                                          </div>
                                        </div>
                                        <div>
                                          Robot Design
                                          <div>
                                            Mechanical Design - (durability: {item2.robotDesign.mechanicalDesign.durability} , mechanical efficiency: {item2.robotDesign.mechanicalDesign.mechanicalEfficiency} , mechanization: {item2.robotDesign.mechanicalDesign.mechanization})
                                          </div>
                                          <div>
                                            Programming - (programming quality: {item2.robotDesign.programming.programmingQuality} , programming efficiency: {item2.robotDesign.programming.programmingEfficiency} , automation navigation: {item2.robotDesign.programming.automationNavigation})
                                          </div>
                                          <div>
                                            Strategical Innovation - (design process: {item2.robotDesign.strategyInnovation.designProcess} , mission Strategy: {item2.robotDesign.strategyInnovation.missionStrategy} , innovation: {item2.robotDesign.strategyInnovation.innovation})
                                          </div>
                                          <div>
                                            Comments: {item2.robotDesign.comments}
                                          </div>
                                        </div>
                                        </div>
                                    )
                                  })}
                                  </div>
                              );
                            })}
                </div>
            </div>
            
        )
    }
}