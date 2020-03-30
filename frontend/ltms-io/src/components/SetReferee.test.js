import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "./../../utils"
import SetReferee from "./SetReferee";

const setUp = (props = {}) => {
  const component = shallow(<SetReferee {...props} />);
  return component;
};

describe("SetReferee Component", () => {
  describe("Basic Rendering", () => {
    let component;
    beforeEach( () => {
      const props = {
        match: {
          params: {
            tourneyId: "testing"
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
});
