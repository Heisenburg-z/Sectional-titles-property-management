import { render, screen } from "@testing-library/react";
import Hero from "../Hero/Hero.js";

test("display welcome page", () => {
  render(<Hero />);
  const linkElement = screen.getByText(/Welcome/i);
  expect(linkElement).toBeInTheDocument();
});

test("display sectional propeties", () => {
  render(<Hero />);
  const linkElement = screen.getByText(/Sectional Propeties Managements/i);
  expect(linkElement).toBeInTheDocument();
});
