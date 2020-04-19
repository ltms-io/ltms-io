import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "./../../utils"
import ViewRubrics from "./../components/ViewRubrics";

const setUp = (props = {}) => {
  const component = shallow(<ViewRubrics {...props} />);
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
      const wrapper = findByTestAttr(component, "theViewRubrics");
      expect(wrapper.length).toBe(1);
    });
  });

  describe("Authorization Rendering", () => {
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

    it("Should render the filter by team and rubric cards sections if authorized", () => {
      component.setState({
        filter: component.state().filter,
        dbresults: component.state().dbresults,
        dbteamsresults: component.state().dbteamsresults,
        dbtournresults: component.state().dbtournresults,
        tourneyId: component.state().tourneyId,
        isAuthorized: true
      });
      var element = findByTestAttr(component, "theFilter");
      expect(element.length).toBe(1);
      element = findByTestAttr(component, "theCards");
      expect(element.length).toBe(1);
      element = findByTestAttr(component, "noAuthMsg");
      expect(element.length).toBe(0);
    });

    it("Should render only the no authorization message if not authorized", () => {
      component.setState({
        filter: component.state().filter,
        dbresults: component.state().dbresults,
        dbteamsresults: component.state().dbteamsresults,
        dbtournresults: component.state().dbtournresults,
        tourneyId: component.state().tourneyId,
        isAuthorized: false
      });
      var element = findByTestAttr(component, "theFilter");
      expect(element.length).toBe(0);
      element = findByTestAttr(component, "theCards");
      expect(element.length).toBe(0);
      element = findByTestAttr(component, "noAuthMsg");
      expect(element.length).toBe(1);
    });
  });
});
