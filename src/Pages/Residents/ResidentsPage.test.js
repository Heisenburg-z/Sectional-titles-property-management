import { render, screen } from "@testing-library/react";
import ResidentsPage from "./ResidentsPage.js";

test("renders residents page", () => {
  render(<ResidentsPage />);
  const adminPage = screen.getByText(/Residents Dashboard/i);
  expect(adminPage).toBeInTheDocument();
});
