// Dashboard.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import axiosMock from 'axios-mock-adapter';
import Dashboard from '../Dashboard';
import { ToastContainer } from 'react-toastify';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import '@testing-library/jest-dom/extend-expect';

// Mock Firebase Firestore functions
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  setDoc: jest.fn(),
  doc: jest.fn(),
  serverTimestamp: jest.fn(),
}));

// Create an instance of axios-mock-adapter to mock axios requests
const mock = new axiosMock(axios);

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  test('renders the Dashboard component', () => {
    render(<Dashboard />);
    expect(screen.getByText('Post Announcement')).toBeInTheDocument();
    expect(screen.getByText('Staff Announcements')).toBeInTheDocument();
    expect(screen.getByText('Weather')).toBeInTheDocument();
  });

  test('allows the admin to post an announcement', async () => {
    render(<Dashboard />);
    
    const textarea = screen.getByPlaceholderText('Type your message here...');
    const postButton = screen.getByText('Post Announcement');
    
    fireEvent.change(textarea, { target: { value: 'Test Announcement' } });
    fireEvent.click(postButton);

    await waitFor(() => {
      expect(screen.getByText('Test Announcement')).toBeInTheDocument();
    });

    // Verify Firestore setDoc call
    expect(setDoc).toHaveBeenCalled();
    expect(screen.getByText('Announcement posted!')).toBeInTheDocument();
  });

  test('fetches and displays weather data', async () => {
    const weatherData = {
      name: 'Johannesburg',
      main: { temp: 25 },
      weather: [{ description: 'clear sky', icon: '01d' }],
    };

    mock.onGet('https://api.openweathermap.org/data/2.5/weather?q=Johannesburg&appid=bc4b2779792a33dc7defab0e8cae5ce8&units=metric')
      .reply(200, weatherData);

    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Location: Johannesburg')).toBeInTheDocument();
      expect(screen.getByText('Temperature: 25°C')).toBeInTheDocument();
      expect(screen.getByText('Weather: clear sky')).toBeInTheDocument();
    });
  });

  test('handles weather data fetch errors', async () => {
    mock.onGet('https://api.openweathermap.org/data/2.5/weather?q=Johannesburg&appid=bc4b2779792a33dc7defab0e8cae5ce8&units=metric')
      .networkError();

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Weather info Loading...')).toBeInTheDocument();
    });
  });
});
