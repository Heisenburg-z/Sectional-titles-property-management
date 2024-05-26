import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import ResidentsPage from '../ResidentsPage';
import ResidentsTopNav from '../Components/TopNav/ResidentsTopNav';
import ResidentsSideBar from '../Components/SideBar/ResidentsSideBars';
import ResidentsMain from '../Components/MainSection/ResidentsMainSection';

// Mock the child components
jest.mock('../Components/TopNav/ResidentsTopNav', () => () => <div data-testid="top-nav">Top Nav</div>);
jest.mock('../Components/SideBar/ResidentsSideBars', () => () => <div data-testid="sidebar">Side Bar</div>);
jest.mock('../Components/MainSection/ResidentsMainSection', () => ({ children }) => <div data-testid="main">{children}</div>);

describe('ResidentsPage Component', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ResidentsPage />
      </BrowserRouter>
    );
  });

  test('renders the navigation bar', () => {
    render(
      <BrowserRouter>
        <ResidentsPage />
      </BrowserRouter>
    );
    expect(screen.getByTestId('top-nav')).toBeInTheDocument();
  });

  test('renders the sidebar', () => {
    render(
      <BrowserRouter>
        <ResidentsPage />
      </BrowserRouter>
    );
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('renders the main section', () => {
    render(
      <BrowserRouter>
        <ResidentsPage />
      </BrowserRouter>
    );
    expect(screen.getByTestId('main')).toBeInTheDocument();
  });

  test('applies correct class names to sections', () => {
    render(
      <BrowserRouter>
        <ResidentsPage />
      </BrowserRouter>
    );
    const body = screen.getByTestId('top-nav').closest('section');
    expect(body).toHaveClass('body');
    expect(screen.getByTestId('top-nav').parentElement).toHaveClass('header');
    expect(screen.getByTestId('sidebar').parentElement).toHaveClass('sidebar');
    expect(screen.getByTestId('main')).toHaveClass('main');
  });
});
