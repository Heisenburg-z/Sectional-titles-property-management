import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import StaffTopNav from "./Components/TopNav/StaffTopNav.js";
import StaffMain from "./Components/MainSection/StaffMainSection.js";

import { BrowserRouter } from 'react-router-dom';
import StaffSideBar from './Components/SideBar/StaffSideBar.js';
import { useAuth } from "../../utils/auth.js";

import StaffPage from './StaffPage.js';

// Mock the child components
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div data-testid="outlet">Outlet Content</div>,
}));

describe('StaffPage Component', () => {
  it('renders the StaffPage component with correct structure', () => {
    render(
      <BrowserRouter>
        <StaffPage />
      </BrowserRouter>
    );

    // Verify the presence of the main section
    const sectionElement = screen.getByTestId('staff-page-section');
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement).toHaveClass('body');

    // Verify the StaffTopNav component
    const topNavElement = screen.getByTestId('staff-top-nav');
    expect(topNavElement).toBeInTheDocument();
    expect(topNavElement).toHaveClass('header');

    // Verify the StaffSideBar component
    const sideBarElement = screen.getByTestId('staff-sidebar');
    expect(sideBarElement).toBeInTheDocument();
    expect(sideBarElement).toHaveClass('sidebar');

    // Verify the StaffMain component with Outlet
    const mainElement = screen.getByTestId('staff-main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('main');

    const outletElement = screen.getByTestId('outlet');
    expect(outletElement).toBeInTheDocument();
    expect(outletElement).toHaveTextContent('Outlet Content');
  });
});

// Mock the useAuth hook
jest.mock("../../utils/auth.js");

describe('StaffSideBar Component', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({
      logout: mockLogout,
    });
  });

  it('renders the StaffSideBar component with correct structure', () => {
    render(
      <BrowserRouter>
        <StaffSideBar className="test-class" />
      </BrowserRouter>
    );

    // Verify the brand image
    const brandImage = screen.getByAltText('');
    expect(brandImage).toBeInTheDocument();
    expect(brandImage).toHaveStyle('width: 120px; height: 120px;');

    // Verify the sidebar links
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('All Maintenance Issues')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();

    // Verify the profile image
    const profileImage = screen.getByAltText('profile');
    expect(profileImage).toBeInTheDocument();

    // Verify the Sign Out link
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('calls the logout function when Sign Out is clicked', () => {
    render(
      <BrowserRouter>
        <StaffSideBar className="test-class" />
      </BrowserRouter>
    );

    const signOutLink = screen.getByText('Sign Out');
    fireEvent.click(signOutLink);

    expect(mockLogout).toHaveBeenCalled();
  });
});

describe('StaffMain Component', () => {
  it('renders without crashing', () => {
    render(<StaffMain className="test-class">Test Content</StaffMain>);
    const mainElement = screen.getByTestId('staff-main');
    expect(mainElement).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<StaffMain className="test-class">Test Content</StaffMain>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies the provided className', () => {
    render(<StaffMain className="custom-class">Content</StaffMain>);
    const mainElement = screen.getByTestId('staff-main');
    expect(mainElement).toHaveClass('custom-class');
  });
});

// Test case to check if the "STAFF / DASHBOARD" heading is rendered
test("renders STAFF / DASHBOARD heading", () => {
  render(
    <BrowserRouter>
      <StaffTopNav />
    </BrowserRouter>,
  );

  const headingElement = screen.getByText("STAFF / DASHBOARD");
  expect(headingElement).toBeInTheDocument();
});
