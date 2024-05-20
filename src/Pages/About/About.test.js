import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About'; // Adjust the import path as necessary
import "@testing-library/jest-dom/extend-expect";

test("renders 'Sectional Titles & Property Management' heading", () => {
  render(<About />);
  const headingElement = screen.getByText(/Sectional Titles & Property Management/i);
  expect(headingElement).toBeInTheDocument();
});

test("renders paragraph content", () => {
  render(<About />);
  const paragraphElement = screen.getByText(/describes the separate ownership of a unit/i);
  expect(paragraphElement).toBeInTheDocument();

  const multipleOwnersElement = screen.getByText(/multiple owners/i);
  expect(multipleOwnersElement).toBeInTheDocument();
});
