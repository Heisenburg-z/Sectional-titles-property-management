/ Hero.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
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

  test('applies correct CSS classes to elements', () => {
    render(<Hero />);
    const welcomeText = screen.getByText('Welcome');
    const welcomeMessage = screen.getByText('Sectional Properties Management');

    expect(welcomeText).toHaveClass('welcometxt');
    expect(welcomeMessage).toHaveClass('welcomeMsg');
  });
});
