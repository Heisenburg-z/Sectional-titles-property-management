import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About'; // Assuming the About component is in the same directory

// Test case to check if the "About Us" heading is rendered
test('renders About Us heading', () => {
  render(<About />);
  const headingElement = screen.getByText('About Us');
  expect(headingElement).toBeInTheDocument();
});

// Test case to check if the paragraph content is rendered
test('renders paragraph content', () => {
  render(<About />);
  const paragraphElement = screen.getByText(/Non in in sint/);
  expect(paragraphElement).toBeInTheDocument();
});