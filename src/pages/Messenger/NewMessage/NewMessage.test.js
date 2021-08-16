import { fireEvent, render, screen } from "@testing-library/react";
import NewMessage from "./NewMessage";
import getContacts from "../getContacts/getContacts";

import davidBarrell from "../../../images/test-images/RightSideBox/david.barrell.png";
import deshith from "../../../images/test-images/RightSideBox/deshith.png";
import lisa from "../../../images/test-images/RightSideBox/lisamwill.png";

const exit = jest.fn();
const setContacts = jest.fn();
const setActiveContact = jest.fn();
const contacts = [
  {
    id: "random ID 1",
    name: "david.barrell",
    image: davidBarrell,
  },
  {
    id: "random ID 2",
    name: "deshith",
    image: deshith,
  },
  {
    id: "random ID 3",
    name: "lisamwil",
    image: lisa,
  },
];

jest.mock("../getContacts/getContacts");

describe("NewMessage", () => {
  beforeEach(() => {
    render(
      <NewMessage
        exit={exit}
        setContacts={setContacts}
        setActiveContact={setActiveContact}
        contacts={contacts}
      />
    );
  });

  it("renders new message screen", () => {
    const newMessage = screen.getByText("New Message");
    expect(newMessage).toBeTruthy();
  });

  it("returns possible recipients when search form recieves input", () => {
    getContacts.mockReturnValueOnce([
      {
        id: "random ID 1",
        name: "david.barrell",
        image: davidBarrell,
      },
    ]);
    const input = screen.getByRole("textbox", "Search for contact");
    expect(input).toBeTruthy();

    fireEvent.change(input, { target: { value: "x" } });
    expect(input.value).toBe("x");
    expect(getContacts.mock.calls.length).toBe(1);

    const knownContact = screen.getByText("david.barrell");
    expect(knownContact).toBeTruthy();

    const contact = screen.getByText("A New User We Dont Already Know");
    expect(contact).toBeTruthy();
  });

  it("updates active contact when a selection from search results is made", () => {
    getContacts.mockReturnValueOnce([]);
    const input = screen.getByRole("textbox", "Search for contact");
    fireEvent.change(input, { target: { value: "x" } });
    const contact = screen.getByText("A New User We Dont Already Know");
    fireEvent.click(contact);
    expect(setActiveContact.mock.calls.length).toBe(1);
  });
});
