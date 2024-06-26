import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Error404 from "./Error404";
import { BrowserRouter } from "react-router-dom";
import { act } from 'react'; // Importing act from react // Importing ReactTestUtils from react-dom/test-utils

// Mocking CSS and SVG imports
jest.mock("./Error404.css", () => ({}));
jest.mock("../../assets/svg/404.svg", () => ({}));

test("renders the logo", () => {
  act(() => {
    render(
      <BrowserRouter>
        <Error404 />
      </BrowserRouter>
    );
  });

  const welcomeText = screen.getByAltText("404 Page not found!");
  expect(welcomeText).toBeInTheDocument();
});
