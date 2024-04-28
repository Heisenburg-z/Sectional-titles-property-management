import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import Hero from "../Hero/Hero.js";

describe('Hero Component', () => {
  test('renders welcome text', () => {
    render(<Hero />);
    const welcomeText = screen.getByText('Welcome');
    expect(welcomeText).toBeInTheDocument();
  });

  test('renders welcome message', () => {
    render(<Hero />);
    const welcomeMessage = screen.getByText('Sectional Properties Management');
    expect(welcomeMessage).toBeInTheDocument();
  });
});
