import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Nav from "../Navbar/Nav";
import { AuthProvider } from "../../../utils/auth.js";
import { BrowserRouter } from "react-router-dom";
jest.mock("../Navbar/Nav.css", () => ({}));

describe("Renders the Nav", () => {
  test("renders the logo", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Nav />
        </AuthProvider>
      </BrowserRouter>,
    );
    const welcomeText = screen.getByText("Logo");
    expect(welcomeText).toBeInTheDocument();
  });

  test("renders the about us link", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Nav />
        </AuthProvider>
      </BrowserRouter>,
    );
    const welcomeMessage = screen.getByText(/About Us/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
  test("renders the login link", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Nav />
        </AuthProvider>
      </BrowserRouter>,
    );
    const welcomeMessage = screen.getByText(/login/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
