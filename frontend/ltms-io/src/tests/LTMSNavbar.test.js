import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "./../../utils"
import LTMSNavbar from "./../components/LTMSNavbar";

const setUp = (props = {}) => {
  const component = shallow(<LTMSNavbar {...props} />);
  return component;
};

describe("LTMSNavbar Component", () => {
  describe("Basic Rendering", () => {
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

  describe("Authentication Rendering", () => {
    let component;

    it("Should render only the logo and quick links menu option if not authenticated", () => {
      const props = {
        testAuthorized: false
      };
      component = setUp(props);

      var element = findByTestAttr(component, "theLogo");
      expect(element.length).toBe(1);
      element = findByTestAttr(component, "theSampleProfilePic");
      expect(element.length).toBe(0);
      element = findByTestAttr(component, "theRealProfilePic");
      expect(element.length).toBe(0);
      element = findByTestAttr(component, "theQuickLinksOption");
      expect(element.length).toBe(1);
      element = findByTestAttr(component, "theCreateTournamentOption");
      expect(element.length).toBe(0);
      element = findByTestAttr(component, "theFindTournamentOption");
      expect(element.length).toBe(0);
      element = findByTestAttr(component, "theSignOutOption");
      expect(element.length).toBe(0);
    });

    it("Should render only the logo, the sample profile pic, and all menu options if authenticated but no profile pic assigned", () => {
      const props = {
        testAuthorized: true,
        testProfPic: true
      };
      component = setUp(props);

      var element = findByTestAttr(component, "theLogo");
      expect(element.length).toBe(1);
      element = findByTestAttr(component, "theSampleProfilePic");
      expect(element.length).toBe(1);
      element = findByTestAttr(component, "theRealProfilePic");
      expect(element.length).toBe(0);
      element = findByTestAttr(component, "theQuickLinksOption");
      expect(element.length).toBe(1);
      element = findByTestAttr(component, "theCreateTournamentOption");
      expect(element.length).toBe(1);
      element = findByTestAttr(component, "theFindTournamentOption");
      expect(element.length).toBe(1);
      element = findByTestAttr(component, "theSignOutOption");
      expect(element.length).toBe(1);
    });

    it("Should render only the logo, no sample profile pic, and all menu options if authenticated and profile pic is assigned", () => {
      const props = {
        testAuthorized: true,
        testProfPic: false
      };
      component = setUp(props);

      var element = findByTestAttr(component, "theLogo");
      expect(element.length).toBe(1);
      element = findByTestAttr(component, "theSampleProfilePic");
      expect(element.length).toBe(0);
      element = findByTestAttr(component, "theQuickLinksOption");
      expect(element.length).toBe(1);
      element = findByTestAttr(component, "theCreateTournamentOption");
      expect(element.length).toBe(1);
      element = findByTestAttr(component, "theFindTournamentOption");
      expect(element.length).toBe(1);
      element = findByTestAttr(component, "theSignOutOption");
      expect(element.length).toBe(1);
    });
  });
});
