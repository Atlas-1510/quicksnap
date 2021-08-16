import React, { useContext } from "react";

import Write from "../../../images/SVG/Write";
import ChevronDown from "../../../images/SVG/ChevronDown";
import PaperAirplane from "../../../images/SVG/PaperAirplane/PaperAirplane";
import ModalBackground from "../../../components/ModalBackground";
import Button from "../../../components/Button";

import { UserContext } from "../../../App";

import ChatBox from "../ChatBox/ChatBox";
import NewMessage from "../NewMessage/NewMessage";

function Desktop({
  handleClick,
  contacts,
  setContacts,
  activeContact,
  setActiveContact,
  messages,
  setMessages,
  newMessage,
  setNewMessage,
  setCurrentPage,
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
            className=" mx-2 w-7 absolute right-0"
            onClick={() => setNewMessage(true)}
            data-testid="test-write-button"
          >
            <Write />
          </div>
        </div>
        <div className="flex flex-col">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center m-2"
              onClick={handleClick}
              data-userid={contact.id}
            >
              <img
                src={contact.image}
                alt="contact"
                className="border rounded-full h-12 pointer-events-none"
                data-testid={`user-image-${contact.id}`}
              />
              <div className="ml-3 flex flex-col pointer-events-none">
                <span className="font-semibold text-sm">{contact.name}</span>
                <span className="text-gray-500 text-xs">last message XYZ</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex col-span-2 h-full border-l border-gray-300 flex-col justify-center">
        {/* Guide to send first message if no messages loaded */}
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
            <Button>Send Message</Button>
          </div>
        )}
        {messages && <ChatBox messages={messages} />}
        {newMessage && (
          <ModalBackground closeFunction={() => setNewMessage(false)}>
            <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-white border rounded-md border-gray-300">
              <NewMessage
                exit={() => setNewMessage(false)}
                setContacts={setContacts}
                contacts={contacts}
                setActiveContact={setActiveContact}
              />
            </div>
          </ModalBackground>
        )}
      </div>
    </div>
  );
}

export default Desktop;
