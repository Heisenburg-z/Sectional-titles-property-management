import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResidentsIssues from './ResidentsIssues';

describe('ResidentsIssues component', () => {
    test('renders without crashing', () => {
      render(<ResidentsIssues />);
      const residentsIssuesElement = screen.getByTestId('empty-div');
      expect(residentsIssuesElement).toBeInTheDocument();
    });
  });

  test('renders an empty div', () => {
    render(<ResidentsIssues />);
    const divElement = screen.getByTestId('empty-div');
    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveTextContent('');
});
