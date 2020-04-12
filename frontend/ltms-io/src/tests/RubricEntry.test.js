import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "./../../utils"
import RubricEntry from "./../components/RubricEntry";

const setUp = (props = {}) => {
  const component = shallow(<RubricEntry {...props} />);
  return component;
};

describe("RubricEntry Component", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        match: {
          params: {
            tourneyId: "Test tourneyId",
            teamId: "Test teamId"
          }
        }
      };
      const propsErr = checkProps(RubricEntry, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe("Basic Rendering", () => {
    let component;
    beforeEach( () => {
      const props = {
        match: {
          params: {
            tourneyId: "Test tourneyId",
            teamId: "Test teamId"
          }
        }
      };
      component = setUp(props);
    });

    it("Should render the component", () => {
      const theComponent = findByTestAttr(component, "theComponent");
      expect(theComponent.length).toBe(1);
    });

    it("Should render the main header", () => {
      const theMainHeader = findByTestAttr(component, "theMainHeader");
      expect(theMainHeader.length).toBe(1);
    });
  });

  describe("Authorization Rendering", () => {
    let component;
    beforeEach( () => {
      const props = {
        match: {
          params: {
            tourneyId: "Test tourneyId",
            teamId: "Test teamId"
          }
        }
      };
      component = setUp(props);
    });

    it("Should render only the rubric submission and deletion forms if authorized", () => {
      component.setState({
        tourneyId: component.state().tourneyId,
        teamId: component.state().teamId,
        dbresults: component.state().dbresults,
        dbtournresults: component.state().dbtournresults,
        dbteamresults: component.state().dbtournresults,
        authresults: component.state().authresults,
        isAuthorized: true
      });
      var element = findByTestAttr(component, "theSubmitForm");
      expect(element.length).toBe(1);
      element = findByTestAttr(component, "theDeleteForm");
      expect(element.length).toBe(1);
      element = findByTestAttr(component, "noAuthMsg");
      expect(element.length).toBe(0);
    });

    it("Should render only the no authorization message if not authorized", () => {
      component.setState({
        tourneyId: component.state().tourneyId,
        dbresults: component.state().dbresults,
        dbtournresults: component.state().dbtournresults,
        authresults: component.state().authresults,
        isAuthorized: false
      });
      var element = findByTestAttr(component, "theSubmitForm");
      expect(element.length).toBe(0);
      element = findByTestAttr(component, "theDeleteForm");
      expect(element.length).toBe(0);
      element = findByTestAttr(component, "noAuthMsg");
      expect(element.length).toBe(1);
    });
  });

  describe("Rubric Submission Form Rendering", () => {
    let component;
    beforeEach( () => {
      const props = {
        match: {
          params: {
            tourneyId: "Test tourneyId",
            teamId: "Test teamId"
          }
        }
      };
      component = setUp(props);
    });

    it("Should render the correct amount of the different types of rubric inputs", () => {
      component.setState({
        tourneyId: component.state().tourneyId,
        teamId: component.state().teamId,
        dbresults: component.state().dbresults,
        dbtournresults: component.state().dbtournresults,
        dbteamresults: component.state().dbtournresults,
        authresults: component.state().authresults,
        isAuthorized: true
      });
      var element = findByTestAttr(component, "anInput");
      expect(element.length).toBe(27);
      element = findByTestAttr(component, "aCommentInput");
      expect(element.length).toBe(3);
    });
  });
});
