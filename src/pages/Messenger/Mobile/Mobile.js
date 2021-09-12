import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Write from "../../../images/SVG/Write";
import ChevronDown from "../../../images/SVG/ChevronDown";
import ChevronLeft from "../../../images/SVG/ChevronLeft";
import ChatBox from "../ChatBox/ChatBox";
import NewChat from "../NewChat/NewChat";
import { UserContext } from "../../Main";

function Mobile({
  chats,
  setChats,
  activeChat,
  setActiveChat,
  messages,
  newChat,
  setNewChat,
  postMessage,
  getChatFromID,
  setCurrentPage,
}) {
  const user = useContext(UserContext);
  return (
    <div
      className=" bg-white relative top-0 w-full h-full flex flex-col"
      data-testid="test-messenger-mobile"
    >
      {!activeChat && !newChat && (
        <div className="h-full flex flex-col">
          <div className="border-b border-gray-300 flex items-center justify-between py-2">
            <Link to="/" onClick={() => setCurrentPage("home")}>
              <div className="mx-2 w-7">
                <ChevronLeft />
              </div>
            </Link>
            <div className="my-1 flex items-center">
              <span className="font-semibold text-sm">{user.name}</span>
              <div className="w-6">
                <ChevronDown />
              </div>
            </div>
            <div
              className=" mx-2 w-7"
              onClick={() => setNewChat(true)}
              data-testid="test-write-button"
            >
              <Write />
            </div>
          </div>
          <div className="flex flex-col">
            {chats &&
              chats.map((chat) => (
                <div
                  key={chat.contact.id}
                  className="flex items-center m-2"
                  onClick={() => getChatFromID(chat.chatID)}
                >
                  <img
                    src={chat.contact.profileImage}
                    alt="contact"
                    className="border rounded-full h-12 pointer-events-none"
                    data-testid={`user-image-${chat.contact.id}`}
                  />
                  <div className="ml-3 flex flex-col pointer-events-none">
                    <span className="font-semibold text-sm">
                      {chat.contact.name}
                    </span>
                    <span className="text-gray-500 text-xs">
                      last message XYZ
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {activeChat && !newChat && (
        <div className="h-full flex flex-col">
          <div className="border-b border-gray-300 flex items-center justify-center py-2 relative">
            <div
              className=" mx-2 w-7 absolute left-0"
              onClick={() => setActiveChat(null)}
              data-testid="test-return-messenger-main"
            >
              <ChevronLeft />
            </div>
            <div
              className="my-1 flex items-center"
              data-testid="activeUserHeading"
            >
              <span className="font-semibold text-sm">
                {activeChat.contact.name}
              </span>
              <div className="w-6">
                <ChevronDown />
              </div>
            </div>
          </div>
          {messages && (
            <ChatBox messages={messages} postMessage={postMessage} />
          )}
        </div>
      )}
      {newChat && !activeChat && (
        <NewChat
          chats={chats}
          setChats={setChats}
          setNewChat={setNewChat}
          setActiveChat={setActiveChat}
          exit={() => setNewChat(false)}
        />
      )}
    </div>
  );
}

export default Mobile;
