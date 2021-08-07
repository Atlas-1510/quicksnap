import { render, screen } from "@testing-library/react";
import Heart from "./Heart";

it("renders outline when not current page", () => {
  render(<Heart currentPage="home" />);

  const icon = screen.getByTitle("like");

  expect(icon).not.toHaveClass("fill-current");
});

it("renders outline when current page", () => {
  render(<Heart currentPage="liked" />);

  const icon = screen.getByTitle("like");

  expect(icon).toHaveClass("fill-current");
});
