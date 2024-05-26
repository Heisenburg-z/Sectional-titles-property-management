
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen } from "@testing-library/react";
import Staff from "./Staff";
import fetchMock from "jest-fetch-mock";
import { BrowserRouter as Router } from "react-router-dom";

fetchMock.enableMocks();

describe("Staff component", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("renders loading state when fetching data", async () => {
    fetch.mockResponseOnce(JSON.stringify([]));
    render(
      <Router>
        <Staff />
      </Router>
    );
    expect(screen.getByTestId("oval-loading")).toBeInTheDocument();
    await screen.findByTestId("staff-signup");
    expect(screen.queryByTestId("oval-loading")).not.toBeInTheDocument();
  });

  it("renders signup form when there is no staff data", async () => {
    fetch.mockResponseOnce(JSON.stringify([]));
    render(
      <Router>
        <Staff />
      </Router>
    );
    await screen.findByTestId("staff-signup");
  });
});

