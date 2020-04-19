import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

export default class ViewRubrics extends Component {
    constructor(props) {
        super(props);

        this.state = {
          dbteamsresults: [],
          tourneyId: this.props.match.params.tourneyId
        };
    }

    render() {
        return (
            <div>
                <div>
                {this.state.dbteamsresults.map( (item1, i1) => {
                              return(
                                <div>
                                  {item1.teamName}
                                  {item1.rubrics.map( (item2, i2) => {
                                    return(
                                      <div>
                                      <hr/>
                                      <h1>Rubric {i2 + 1}</h1>;
                                      <h3>Core Values</h3>;
                                      <strong>Inspiration:</strong> (<em>Discovery:</em> {item2.coreValues.inspiration.discovery},
                                                                   <em>Team Identity:</em>   {item2.coreValues.inspiration.teamIdentity}  ,
                                                                   <em>Impact:</em>   {item2.coreValues.inspiration.impact}  )<br/>;
                                      <strong>Teamwork:</strong> (<em>Effectiveness:</em>   {item2.coreValues.teamwork.effectiveness}  ,
                                                                 <em>Efficiency:</em>   {item2.coreValues.teamwork.efficiency}  ,
                                                                 <em>Kids Do the Work:</em>   {item2.coreValues.teamwork.kidsDoTheWork}  )<br/>;
                                      <strong>Gracious Professionalism®:</strong> (<em>Inclusion:</em>   {item2.coreValues.graciousProfessionalism.inclusion}  ,
                                                                                 <em>Respect:</em>   {item2.coreValues.graciousProfessionalism.respect}  ,
                                                                                 <em>Coopertition®:</em>   {item2.coreValues.graciousProfessionalism.coopertition}  )<br/>;
                                      <strong>Comments:</strong> <em>  {item2.coreValues.comments}  </em><br/>;

                                      <h3>Innovation Project</h3>
                                      <strong>Research:</strong> (<em>Problem Identification:</em>   {item2.innovationProject.research.problemIdentificaton}  ,
                                                                 <em>Sources of Information:</em>   {item2.innovationProject.research.sourcesOfInformation}  ,
                                                                 <em>Problem Analysis:</em>   {item2.innovationProject.research.problemAnalysis}  )<br/>;
                                      <strong>Innovative Solution:</strong> (<em>Team Solution:</em>   {item2.innovationProject.innovativeSolution.teamSolution}  ,
                                                                           <em>Innovation:</em>   {item2.innovationProject.innovativeSolution.innovation}  ,
                                                                           <em>Solution Development:</em>   {item2.innovationProject.innovativeSolution.solutionDevelopment}  )<br/>;
                                      <strong>Presentation:</strong> (<em>Sharing:</em>   {item2.innovationProject.presentation.sharing}  ,
                                                                    <em>Creativity:</em>   {item2.innovationProject.presentation.creativity}  ,
                                                                    <em>Presentation Effectiveness:</em>   {item2.innovationProject.presentation.presentationEffectiveness}  )<br/>;
                                      <strong>Comments:</strong> <em>  {item2.innovationProject.comments}  </em><br/>;

                                      <h3>Robot Design</h3>
                                      <strong>Mechanical Design:</strong> (<em>Durability:</em>   {item2.robotDesign.mechanicalDesign.durability}  ,
                                                                         <em>Mechanical Efficiency:</em>   {item2.robotDesign.mechanicalDesign.mechanicalEfficiency}  ,
                                                                         <em>Mechanization:</em>   {item2.robotDesign.mechanicalDesign.mechanization}  )<br/>;
                                      <strong>Programming:</strong> (<em>Programming Quality:</em>   {item2.robotDesign.programming.programmingQuality}  ,
                                                                   <em>Programming Efficiency:</em>   {item2.robotDesign.programming.programmingEfficiency}  ,
                                                                   <em>Automation/Navigation:</em>   {item2.robotDesign.programming.automationNavigation}  )<br/>;
                                      <strong>Strategy & Innovation:</strong> (<em>Design Process:</em>   {item2.robotDesign.strategyInnovation.designProcess}  ,
                                                                             <em>Mission Strategy:</em>   {item2.robotDesign.strategyInnovation.missionStrategy}  ,
                                                                             <em>Innovation:</em>   {item2.robotDesign.strategyInnovation.innovation}  )<br/>;
                                      <strong>Comments:</strong> <em>  {item2.robotDesign.comments}  </em><br/><br/>
                                      </div>
                                    );
                                  })}
                                  </div>
                              );
                  })}
                </div>
            </div>

        );
    }

    async componentDidMount() {
      await axios.get(`/api/teams/tournid/${this.state.tourneyId}`)
      .then ( (res) => {
        this.state.dbteamsresults = res.data;
      });

      this.setState(this.state);
      console.log("INITIAL VIEW RUBRICS STATE", this.state);
    }
}
