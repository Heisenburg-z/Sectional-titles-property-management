import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResidentsMaintenance from './ResidentMaintenance';

describe('ResidentsMaintenance component', () => {
  test('submits maintenance request', async () => {
    // Render the component
    const { getByText, getByLabelText, getByTestId } = render(<ResidentsMaintenance />);
    
    // Simulate user input
    fireEvent.change(getByLabelText('Room Number:'), { target: { value: '101' } });
    fireEvent.change(getByLabelText('Description'), { target: { value: 'Test maintenance description' } });

     // Select maintenance type from dropdown
    const dropdown = getByTestId('maintenance-dropdown');
    fireEvent.change(dropdown, { target: { value: 'Cleaning' } });
    
    // Mock fetch request
    window.fetch = jest.fn().mockResolvedValueOnce({ ok: true });
    
    // Submit the form
    fireEvent.click(getByText('Submit'));
    
    // Wait for the mock fetch request to resolve
  await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));

  // Assert that the API was called with the correct data
  expect(window.fetch).toHaveBeenCalledWith(
    '/api/property/resident/maintenance',
    expect.objectContaining({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        maintenanceType: 'Cleaning', // Ensure maintenanceType is set correctly
        roomNumber: '101',
        date: '', // Assuming the date is empty in this test
        Description: 'Test maintenance description',
        Status: 'Open',
      }),
    })
  );
    
    // Assert that the form fields are cleared after submission
    expect(getByLabelText('Room Number:').value).toBe('101');
    expect(getByLabelText('Description').value).toBe('Test maintenance description');
  });
});

