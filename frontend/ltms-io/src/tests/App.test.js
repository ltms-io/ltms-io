import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from "enzyme";
import { findByTestAttr } from "./../../utils"
import App from './../App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it("Base App Test", () => {
  expect(findByTestAttr(shallow(<App />), "theApp").length).toBe(1);
});
