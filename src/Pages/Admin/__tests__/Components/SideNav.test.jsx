import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SideBar from "../../Components/SideBar/SideBar";
import { BrowserRouter } from "react-router-dom";

// Mock useAuth hook
jest.mock("../../../../utils/auth.js", () => ({
  useAuth: () => ({
    logout: jest.fn(),
  }),
}));
jest.mock("../../Components/SideBar/SideBar.css", () => ({}));
// describe("SideBar Component", () => {
test("renders Dashboard tab name on sidebar", () => {
  render(
    <BrowserRouter>
      <SideBar />
    </BrowserRouter>,
  );
  const welcomeText = screen.getByText("Dashboard");
  expect(welcomeText).toBeInTheDocument();
});

test("renders Staff tab name on sidebar", () => {
  render(
    <BrowserRouter>
      <SideBar />
    </BrowserRouter>,
  );
  const welcomeMessage = screen.getByText("Staff");
  expect(welcomeMessage).toBeInTheDocument();
});
test("renders Residents tab name on sidebar", () => {
  render(
    <BrowserRouter>
      <SideBar />
    </BrowserRouter>,
  );
  const welcomeMessage = screen.getByText("Residents");
  expect(welcomeMessage).toBeInTheDocument();
});
test("renders Admins tab name on sidebar", () => {
  render(
    <BrowserRouter>
      <SideBar />
    </BrowserRouter>,
  );
  const welcomeMessage = screen.getByText("Admins");
  expect(welcomeMessage).toBeInTheDocument();
});
test("renders Maintenance tab name on sidebar", () => {
  render(
    <BrowserRouter>
      <SideBar />
    </BrowserRouter>,
  );
  const welcomeMessage = screen.getByText("Maintenance");
  expect(welcomeMessage).toBeInTheDocument();
});
test("renders Fines tab name on sidebar", () => {
  render(
    <BrowserRouter>
      <SideBar />
    </BrowserRouter>,
  );
  const welcomeMessage = screen.getByText("Fines");
  expect(welcomeMessage).toBeInTheDocument();
});
test("renders Reports tab name on sidebar", () => {
  render(
    <BrowserRouter>
      <SideBar />
    </BrowserRouter>,
  );
  const welcomeMessage = screen.getByText("Fines");
  expect(welcomeMessage).toBeInTheDocument();
});
test("renders SignOut button on sidebar", () => {
  render(
    <BrowserRouter>
      <SideBar />
    </BrowserRouter>,
  );
  const welcomeMessage = screen.getByText("Sign Out");
  expect(welcomeMessage).toBeInTheDocument();
});
// });
