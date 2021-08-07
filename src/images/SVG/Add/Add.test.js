import { render, screen } from "@testing-library/react";
import Add from "./Add";

it("renders outline when not current page", () => {
  render(<Add currentPage="home" />);

  const icon = screen.getByTitle("add");

  expect(icon).not.toHaveClass("fill-current");
});

it("renders outline when current page", () => {
  render(<Add currentPage="add" />);

  const icon = screen.getByTitle("add");

  expect(icon).toHaveClass("fill-current");
});
