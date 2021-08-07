import { render, screen } from "@testing-library/react";
import PaperAirplane from "./PaperAirplane";

it("renders outline when not current page", () => {
  render(<PaperAirplane currentPage="home" />);

  const icon = screen.getByTitle("messenger");

  expect(icon).not.toHaveClass("fill-current");
});

it("renders outline when current page", () => {
  render(<PaperAirplane currentPage="messenger" />);

  const icon = screen.getByTitle("messenger");

  expect(icon).toHaveClass("fill-current");
});
