import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VisitorsPage from './VistorsPage';


jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    onAuthStateChanged: jest.fn((auth, callback) => {
      // Mock unsubscribe function
      const unsubscribe = jest.fn();
      callback({ email: 'test@example.com' }); // Mock authenticated state
      return unsubscribe;
    }),
  }));
  



describe('VisitorsPage component', () => {
  test('submits visitor sign-in form', async () => {
    // Mock fetch to simulate successful form submission
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true });
    
    render(<VisitorsPage />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Residents Name:'), { target: { value: 'John' } });
    // Fill out other form fields...

    // Submit the form
    fireEvent.click(screen.getByText('Submit'));

    
    // Ensure the form is cleared after submission
    expect(screen.getByLabelText('Residents Name:').value).toBe('John');
    // Check other form fields...
  });

  test('displays visitor data table', async () => {
    // Mock fetch to simulate successful data retrieval
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([{ id: 1, vistorName: 'John', /* other visitor properties */ }])
    });

    render(<VisitorsPage />);

    // Switch to table view
    fireEvent.click(screen.getByTestId('view-signed-in-visitors-button'));

    // Wait for data to be loaded and displayed
    await waitFor(() => expect(screen.getByText('John')).toBeInTheDocument());
  });

  // Add more tests for loading state, error handling, and view switching...
});
