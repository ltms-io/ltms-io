import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "./../../utils"
import Sheet from "./../components/Scoresheet";

const setUp = (props = {}) => {
  const component = shallow(<Sheet {...props} />);
  return component;
};

describe("Scoresheet Component", () => {
  describe("Basic Rendering", () => {
    let component;
    beforeEach( () => {
      const props = {
        match: {
          params: {
            tourneyId: "Test tourneyId"
          }
        }
      };
      component = setUp(props);
    });

    it("Should render without errors", () => {
      const wrapper = findByTestAttr(component, "theScoresheet");
      expect(wrapper.length).toBe(1);
    });
    it("Should render the Calculate score option", () => {
      component.setState({
        tourneyId: component.state().tourneyId,
        modal: component.state().modal,
        team: component.state().team,
        readOnly: component.state().readOnly,
        events: component.state().events,
        runningScore: component.state().runningScore,
        finalscore: component.state().finalscore,
        scoreType: component.state().scoreType,
        index: component.state().index,
        category: component.state().category,
        disabled: true
      })
      var wrapper = findByTestAttr(component, "theFinalScore");
      expect(wrapper.length).toBe(1);
    });
  });
})