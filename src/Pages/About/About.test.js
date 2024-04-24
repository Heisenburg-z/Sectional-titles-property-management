import { render, screen } from "@testing-library/react";
import About from "./About";

test("About renders correctly", () => {
  render(<About />);
  const textElement = screen.getByText(/about us/i);
  expect(textElement).toBeInTheDocument();
});
