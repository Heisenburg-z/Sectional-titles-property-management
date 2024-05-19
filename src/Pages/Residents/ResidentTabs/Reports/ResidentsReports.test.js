import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ResidentsReports from './ResidentsReports';

describe('ResidentsReports component', () => {
  test('renders without crashing', () => {
    render(
      <Router>
        <ResidentsReports />
      </Router>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  test('clicking buttons triggers navigation', () => {
    const { getByText } = render(
      <Router>
        <ResidentsReports />
      </Router>
    );

    fireEvent.click(getByText('Fines'));
    expect(window.location.pathname).toBe('/resident/reports/fines');

    fireEvent.click(getByText('Issues'));
    expect(window.location.pathname).toBe('/resident/reports/issues');
  });
});
