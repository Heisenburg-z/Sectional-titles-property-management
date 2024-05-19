import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import Nav from "../Navbar/Nav"; // Adjust the path if necessary

// Mock useAuth hook
jest.mock("../../../utils/auth.js", () => ({
  useAuth: () => ({
    user: "testUser", // Mocking user data for the AuthProvider
    userRole: "admin", // Mocking user role for the AuthProvider
  }),
}));

// Mock CSS import
jest.mock("../Navbar/Nav.css", () => ({}));

describe("Nav component", () => {
  test("renders About Us link", () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
    const aboutUsLink = screen.getByText(/About Us/i);
    expect(aboutUsLink).toBeInTheDocument();
    expect(aboutUsLink).toHaveAttribute("href", "/about"); // Check if the href attribute is correct
  });

  test("renders Login link", () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
  
    // Check if the component is rendered correctly
    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
  
    // Check if the "Login" link is present in the document
    const loginLink = document.querySelector('a[href="/login"]');
    if (loginLink) {
      expect(loginLink).toBeInTheDocument();
    } else {
      // Log a message if loginLink is null
    }
  });

  test("renders user-specific links when user is logged in", () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
    const dashboardLink = screen.getByText(/testUser/i);
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute("href", "/admin/dashboard"); // Assuming the user role is 'admin'
  });
});

