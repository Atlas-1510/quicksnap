import { render, screen } from "@testing-library/react";
import ChatBox from "./ChatBox";
import { UserContext } from "../../App";

describe("ChatBox", () => {
  const messages = [
    {
      id: 1,
      authorID: 1,
      content: "user message 1",
    },
    {
      id: 2,
      authorID: 2,
      content: "respondant message 1",
    },
    {
      id: 3,
      authorID: 1,
      content: "user message 2",
    },
    {
      id: 4,
      authorID: 1,
      content:
        "A really really really really really really really really really really really really really really really long message",
    },
    {
      id: 5,
      authorID: 2,
      content:
        "Another really  really really really really really really really really long message",
    },
  ];

  beforeEach(() => {
    render(
      <UserContext.Provider
        value={{
          id: 1,
        }}
      >
        <ChatBox messages={messages} />;
      </UserContext.Provider>
    );
  });

  it("renders previous user messages in blue", () => {
    const message = screen.getByText("user message 1");
    expect(message).toBeTruthy();
    expect(message.classList.contains("bg-blue-500")).toBe(true);
  });

  it("renders previous contact messages in gray", () => {
    const message = screen.getByText("respondant message 1");
    expect(message).toBeTruthy();
    expect(message.classList.contains("bg-gray-300")).toBe(true);
  });

  // TODO: Add tests for entering a new message
});
