import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "./../../utils"
import Schedule from "./../components/Schedule";

const setUp = (props = {}) => {
  const component = shallow(<Schedule {...props} />);
  return component;
};

describe("ViewRubrics Component", () => {
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
      const wrapper = findByTestAttr(component, "theSchedule");
      expect(wrapper.length).toBe(1);
    });

    it("Should render the new schedule choice", () => {
      component.setState({
        tourneyId: component.state().tourneyId,
        startTime: component.state().startTime,
        cycleTime: component.state().cycleTime,
        numJudgeRooms: component.state().numJudgeRooms,
        numMatches: component.state().numMatches,
        numTables: component.state().numTables,
        teams: component.state().teams,
        droppedTeams: false,
        tableLayout: component.state().tableLayout,
        disabled: true
      })
      var wrapper = findByTestAttr(component, "theChange");
      expect(wrapper.length).toBe(1);
      wrapper = findByTestAttr(component, "theTime");
      expect(wrapper.length).toBe(0)
    })
  });
});