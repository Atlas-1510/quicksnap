import { render, screen } from "@testing-library/react";
import Eye from "./Eye";

it("renders outline when not current page", () => {
  render(<Eye currentPage="home" />);

  const icon = screen.getByTitle("explore");

  expect(icon).not.toHaveClass("fill-current");
});

it("renders outline when current page", () => {
  render(<Eye currentPage="explore" />);

  const icon = screen.getByTitle("explore");

  expect(icon).toHaveClass("fill-current");
});
