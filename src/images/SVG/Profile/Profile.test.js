import { render, screen } from "@testing-library/react";
import Profile from "./Profile";

it("renders outline when not current page", () => {
  render(<Profile currentPage="home" />);

  const icon = screen.getByTitle("profile");

  expect(icon).not.toHaveClass("fill-current");
});

it("renders outline when current page", () => {
  render(<Profile currentPage="profile" />);

  const icon = screen.getByTitle("profile");

  expect(icon).toHaveClass("fill-current");
});
