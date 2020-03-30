import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "./../../utils"
import LTMSNavbar from "./LTMSNavbar";

const setUp = (props = {}) => {
  const component = shallow(<LTMSNavbar {...props} />);
  return component;
};

describe("LTMSNavbar Component", () => {
  let component;
  beforeEach( () => {
    component = setUp();
  })

  it("Should render without errors", () => {
    const wrapper = findByTestAttr(component, "theNavbar");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a logo", () => {
    const logo = findByTestAttr(component, "theLogo");
    expect(logo.length).toBe(1);
  });
});
