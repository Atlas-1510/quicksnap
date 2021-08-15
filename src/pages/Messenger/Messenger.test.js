import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Messenger from "./Messenger";
import getContacts from "./getContacts";
import getMessages from "./getMessages";

import testImage from "../../images/test-images/RightSideBox/david.barrell.png";
import { UserContext } from "../../App";
import useWindowSize from "../../hooks/useWindowSize/useWindowSize";

jest.mock("../../hooks/useWindowSize/useWindowSize");
jest.mock("./getContacts");
jest.mock("./getMessages");

describe("Messenger - small screen", () => {
  let instance;

  beforeEach(() => {
    getContacts.mockReturnValue([
      {
        id: "random ID 1",
        name: "test-user-name",
        image: testImage,
      },
    ]);
    getMessages.mockReturnValue([
      {
        id: 1,
        authorID: "random ID 1",
        content: "message content 1",
      },
      {
        id: 2,
        authorID: "random ID 2",
        content: "message content 2",
      },
      {
        id: 3,
        authorID: "random ID 1",
        content: "message content 3",
      },
    ]);
    useWindowSize.mockReturnValue({ width: 700 });

    instance = render(
      <BrowserRouter>
        <UserContext.Provider
          value={{
            id: 1,
          }}
        >
          <Messenger />
        </UserContext.Provider>
      </BrowserRouter>
    );
  });

  it("renders Mobile component when screen width is less than 768px", () => {
    const mobile = screen.getByTestId("test-messenger-mobile");
    expect(mobile).toBeTruthy();
  });
});

// Bug with resetting useWindowSize mock, so new describe block used for larger screens
describe("Messenger - large screen", () => {
  let instance;

  beforeEach(() => {
    getContacts.mockReturnValue([
      {
        id: "random ID 1",
        name: "test-user-name",
        image: testImage,
      },
    ]);
    getMessages.mockReturnValue([
      {
        id: 1,
        authorID: "random ID 1",
        content: "message content 1",
      },
      {
        id: 2,
        authorID: "random ID 2",
        content: "message content 2",
      },
      {
        id: 3,
        authorID: "random ID 1",
        content: "message content 3",
      },
    ]);
    useWindowSize.mockReturnValue({ width: 900 });

    instance = render(
      <BrowserRouter>
        <UserContext.Provider
          value={{
            id: 1,
          }}
        >
          <Messenger />
        </UserContext.Provider>
      </BrowserRouter>
    );
  });

  it("renders Desktop component when screen width is greater than 768px", () => {
    const desktop = screen.getByTestId("test-messenger-desktop");
    expect(desktop).toBeTruthy();
  });
});
