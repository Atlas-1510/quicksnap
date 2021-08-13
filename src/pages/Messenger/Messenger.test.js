import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Messenger from "./Messenger";
import getContacts from "./getContacts";
import getMessages from "./getMessages";

import testImage from "../../images/test-images/RightSideBox/david.barrell.png";
import { UserContext } from "../../App";

jest.mock("./getContacts");
jest.mock("./getMessages");

describe("Messenger", () => {
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

    render(
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

  it("renders contact information", () => {
    const contact = screen.getByText("test-user-name");
    expect(contact).toBeTruthy();

    const image = screen.getByTestId(`user-image-random ID 1`);
    expect(image).toHaveAttribute("src", testImage);
  });

  it("renders send message prompt", () => {
    const prompt = screen.getByText("Send private messages to a friend");

    expect(prompt).toBeVisible();
  });

  it("requests messages when a contact is clicked", () => {
    const contact = screen.getByText("test-user-name");
    fireEvent.click(contact);

    expect(getMessages.mock.calls.length).toBe(1);
  });

  it("renders messages when a contact is clicked", () => {
    const contact = screen.getByText("test-user-name");
    fireEvent.click(contact);

    const first = screen.getByText("message content 1");
    const second = screen.getByText("message content 2");
    const third = screen.getByText("message content 3");

    expect(first).toBeTruthy();
    expect(second).toBeTruthy();
    expect(third).toBeTruthy();
  });
});
