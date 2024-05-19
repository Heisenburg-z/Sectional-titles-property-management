import React from 'react';
import { render, screen } from '@testing-library/react';
import ResidentsDashBoard from './ResidentsDashboard'; // Assuming the component is in the same directory
import { act } from 'react'; // Importing act from react

// Test case to check if the "Residents DashBoard" heading is rendered
test('renders Residents DashBoard heading', () => {
  act(() => { // Wrap the render method in act
    render(<ResidentsDashBoard />);
  });
  const headingElement = screen.getByText(/Residents DashBoard/i);
  expect(headingElement).toBeInTheDocument();
});


