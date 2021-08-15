import Mobile from "./Mobile";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../App";
import testImage from "../../images/test-images/RightSideBox/david.barrell.png";

jest.mock("./ChatBox", () => {
  const ChatBox = () => <div>ChatBox</div>;
  return ChatBox;
});

describe("Messenger - Mobile", () => {
  const contacts = [
    {
      id: "random ID 1",
      name: "test-contact-name",
      image: testImage,
    },
  ];
  const messages = [
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
  ];

  const handleClick = jest.fn();
  const setContacts = jest.fn();
  const activeContact = false;
  const setActiveContact = jest.fn();
  const setMessages = jest.fn();
  const newMessage = false;
  const setNewMessage = jest.fn();
  const setCurrentPage = jest.fn();

  let instance;

  beforeEach(() => {
    instance = render(
      <BrowserRouter>
        <UserContext.Provider
          value={{
            id: 1,
            name: "test-user-name",
          }}
        >
          <Mobile
            contacts={contacts}
            messages={messages}
            handleClick={handleClick}
            setContacts={setContacts}
            activeContact={activeContact}
            setActiveContact={setActiveContact}
            setMessages={setMessages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            setCurrentPage={setCurrentPage}
          />
          ;
        </UserContext.Provider>
      </BrowserRouter>
    );
  });

  it("renders with contacts and username", () => {
    const username = screen.getByText("test-user-name");
    expect(username).toBeTruthy();

    const contact = screen.getByText("test-contact-name");
    expect(contact).toBeTruthy();

    const image = screen.getByTestId(`user-image-random ID 1`);
    expect(image).toHaveAttribute("src", testImage);
  });

  it("fires click handler when contact is clicked", () => {
    const contact = screen.getByText("test-contact-name");
    fireEvent.click(contact);

    expect(handleClick.mock.calls.length).toBe(1);
  });

  it("activates new message screen when button is clicked", () => {
    const writeNewMessageButton = screen.getByTestId("test-write-button");
    fireEvent.click(writeNewMessageButton);

    expect(setNewMessage.mock.calls[0][0]).toBe(true);

    instance.rerender(<Mobile newMessage={true} />);

    const newMessageTitle = screen.getByText("New Message");
    expect(newMessageTitle).toBeTruthy();
  });

  it("renders contact name when given a contact is active", () => {
    instance.rerender(
      <Mobile
        activeContact={{
          id: "random ID 1",
          name: "test-contact-name",
          image: testImage,
        }}
      />
    );

    // Renders active contact name in header
    const newMessageTitle = screen.getByText("test-contact-name");
    expect(newMessageTitle).toBeTruthy();
  });

  it("renders ChatBox component when given an active contact", () => {
    instance.rerender(
      <Mobile
        activeContact={{
          id: "random ID 1",
          name: "test-contact-name",
          image: testImage,
        }}
        // For some reason, messages needs to passed to the rerender again. No actual change to messages for this test.
        messages={[
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
        ]}
      />
    );

    // Renders ChatBox component, which will display messages
    // ChatBox has been stubbed, to only show a div with "ChatBox" inside
    const ChatBox = screen.getByText("ChatBox");
    expect(ChatBox).toBeTruthy();
  });

  it("while a contact is active, returns to main messenger page when left-chevron is clicked", () => {
    instance.rerender(
      <Mobile
        activeContact={{
          id: "random ID 1",
          name: "test-contact-name",
          image: testImage,
        }}
        setActiveContact={setActiveContact}
      />
    );

    const returnHomeButton = screen.getByTestId("test-return-messenger-main");
    expect(returnHomeButton).toBeTruthy();

    fireEvent.click(returnHomeButton);

    expect(setActiveContact).toBeCalled();
    expect(setActiveContact.mock.calls[0][0]).toBe(null);
  });
});
