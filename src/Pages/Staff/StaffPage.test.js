import { render, screen } from "@testing-library/react";
import StaffPage from "./StaffPage.js";

test("renders staff page", () => {
  render(<StaffPage />);
  const adminPage = screen.getByText(/Staff Dashboard/i);
  expect(adminPage).toBeInTheDocument();
});
