import { render, screen } from "@testing-library/react";
import Home from "./Home";

it("renders outline when not current page", () => {
  render(<Home currentPage="messenger" />);

  const icon = screen.getByTitle("home");

  expect(icon).not.toHaveClass("fill-current");
});

it("renders outline when current page", () => {
  render(<Home currentPage="home" />);

  const icon = screen.getByTitle("home");

  expect(icon).toHaveClass("fill-current");
});
