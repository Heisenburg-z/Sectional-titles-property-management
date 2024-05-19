import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResidentsFines from './ResidentsFines';

// Mock the useAuth hook directly
jest.mock('../../../../utils/auth', () => ({
  useAuth: jest.fn().mockReturnValue({ profileId: 'mock-profile-id' }),
}));

describe('ResidentsFines component', () => {
  test('renders fines data correctly', async () => {
    // Mock the profile data
    const mockProfileData = [
      {
        Name: 'John Doe',
        RoomNo: '101',
        Type: 'Late payment',
        Amount: 50,
        DateIssued: '2024-05-18',
        Status: 'Pending',
      },
      {
        Name: 'Jane Smith',
        RoomNo: '102',
        Type: 'Damage to property',
        Amount: 100,
        DateIssued: '2024-05-15',
        Status: 'Paid',
      },
    ];

    // Mock the fetch function to return the profile data
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockProfileData),
    });

    // Render the component
    render(<ResidentsFines />);

    // Wait for the component to fetch data and render
    await waitFor(() => {
      // Check if the table headers are rendered
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('RoomNo')).toBeInTheDocument();
      expect(screen.getByText('Reason for fine')).toBeInTheDocument();
      expect(screen.getByText('Amount Due')).toBeInTheDocument();
      expect(screen.getByText('Date Issued')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();

      // Check if the profile data is rendered
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('101')).toBeInTheDocument();
      expect(screen.getByText('Late payment')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.getByText('2024-05-18')).toBeInTheDocument();
      expect(screen.getByText('Pending')).toBeInTheDocument();

      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('102')).toBeInTheDocument();
      expect(screen.getByText('Damage to property')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('2024-05-15')).toBeInTheDocument();
      expect(screen.getByText('Paid')).toBeInTheDocument();
    });
  });
});

