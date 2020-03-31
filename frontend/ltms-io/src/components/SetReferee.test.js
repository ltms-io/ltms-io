import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "./../../utils"
import SetReferee from "./SetReferee";

const setUp = (props = {}) => {
  const component = shallow(<SetReferee {...props} />);
  return component;
};

describe("SetReferee Component", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        match: {
          params: {
            tourneyId: "Test tourneyId"
          }
        }
      };
      const propsErr = checkProps(SetReferee, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

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

    it("Should render the component", () => {
      const theComponent = findByTestAttr(component, "theComponent");
      expect(theComponent.length).toBe(1);
    });

    it("Should render the main header", () => {
      const theMainHeader = findByTestAttr(component, "theMainHeader");
      expect(theMainHeader.length).toBe(1);
    });
  });

  describe("Authorization", () => {
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

    it("Should render only the form if authorized", () => {
      component.setState({
        tourneyId: component.state().tourneyId,
        dbresults: component.state().dbresults,
        dbtournresults: component.state().dbtournresults,
        authresults: component.state().authresults,
        isAuthorized: true
      });
      var element = findByTestAttr(component, "theForm");
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
      var element = findByTestAttr(component, "theForm");
      expect(element.length).toBe(0);
      element = findByTestAttr(component, "noAuthMsg");
      expect(element.length).toBe(1);
    });
  });
});
