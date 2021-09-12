import React, { useContext } from "react";
import Write from "../../../images/SVG/Write";
import ChevronDown from "../../../images/SVG/ChevronDown";
import PaperAirplane from "../../../images/SVG/PaperAirplane/PaperAirplane";
import ModalBackground from "../../../components/ModalBackground";
import Button from "../../../components/Button";
import { UserContext } from "../../Main";
import ChatBox from "../ChatBox/ChatBox";
import NewChat from "../NewChat/NewChat";

function Desktop({
  chats,
  setChats,
  setActiveChat,
  messages,
  newChat,
  setNewChat,
  postMessage,
  getChatFromID,
}) {
  const user = useContext(UserContext);
  return (
    <div
      className=" my-7 bg-white border rounded-md border-gray-300 
      grid grid-cols-3 top-0 static w-full h-5/6"
      data-testid="test-messenger-desktop"
    >
      <div className="col-span-1 h-full flex flex-col">
        <div className="border-b border-gray-300 flex items-center justify-center py-2 relative">
          <div className="my-1 flex items-center">
            <span className="font-semibold text-sm">{user.name}</span>
            <div className="w-6">
              <ChevronDown />
            </div>
          </div>
          <div
            className=" mx-2 w-7 absolute right-0 cursor-pointer"
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
                key={chat.chatID}
                className="flex items-center m-2 cursor-pointer"
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
                    {chat.contact.fullName}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex col-span-2 h-full border-l border-gray-300 flex-col justify-center">
        {" "}
        {!messages && (
          <div className="flex flex-col justify-center items-center">
            <div className="border-2 border-gray-800 rounded-full my-1">
              <div className=" w-16 m-3 relative bottom-1 left-1 transform rotate-45">
                <PaperAirplane />
              </div>
            </div>
            <span className="text-xl my-1">Your Messages</span>
            <span className="text-sm text-gray-500">
              Send private messages to a friend
            </span>
            <div onClick={() => setNewChat(true)}>
              <Button>Send Message</Button>
            </div>
          </div>
        )}
        {messages && <ChatBox messages={messages} postMessage={postMessage} />}
        {newChat && (
          <ModalBackground closeFunction={() => setNewChat(false)}>
            <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-white border rounded-md border-gray-300">
              <NewChat
                exit={() => setNewChat(false)}
                setActiveChat={setActiveChat}
                chats={chats}
                setChats={setChats}
              />
            </div>
          </ModalBackground>
        )}
      </div>
    </div>
  );
}

export default Desktop;
