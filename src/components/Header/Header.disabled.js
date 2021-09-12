import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter as Router } from "react-router-dom";

it("renders two QuickSnap logos in header (one hidden, for mobile)", () => {
  render(
    <Router>
      <Header />
    </Router>
  );
  const list = screen.getAllByText("QuickSnap");
  expect(list).toHaveLength(2);
});

it("messenger icon changes current page state on click", () => {
  const pageSetter = jest.fn();

  render(
    <Router>
      <Header setCurrentPage={pageSetter} currentPage="home" />
    </Router>
  );

  const messenger = screen.getByTestId("messenger-icon").querySelector("svg");

  fireEvent.click(messenger);

  expect(pageSetter.mock.calls.length).toBe(1);
});
