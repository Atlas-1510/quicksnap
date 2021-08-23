import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Write from "../../../images/SVG/Write";
import ChevronDown from "../../../images/SVG/ChevronDown";
import ChevronLeft from "../../../images/SVG/ChevronLeft";

import ChatBox from "../ChatBox/ChatBox";
import NewMessage from "../NewMessage/NewMessage";

import { UserContext } from "../../Main";
import BottomMobileNav from "../../../components/BottomMobileNav";

function Mobile({
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
      className=" bg-white absolute top-0 w-full h-full"
      data-testid="test-messenger-mobile"
    >
      {!activeContact && !newMessage && (
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
                  <span className="text-gray-500 text-xs">
                    last message XYZ
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeContact && !newMessage && (
        <div className="h-full flex flex-col">
          <div className="border-b border-gray-300 flex items-center justify-center py-2 relative">
            <div
              className=" mx-2 w-7 absolute left-0"
              onClick={() => setActiveContact(null)}
              data-testid="test-return-messenger-main"
            >
              <ChevronLeft />
            </div>
            <div
              className="my-1 flex items-center"
              data-testid="activeUserHeading"
            >
              <span className="font-semibold text-sm">
                {activeContact.name}
              </span>
              <div className="w-6">
                <ChevronDown />
              </div>
            </div>
          </div>
          {messages && <ChatBox messages={messages} />}
        </div>
      )}
      {newMessage && !activeContact && (
        <NewMessage
          setNewMessage={setNewMessage}
          setContacts={setContacts}
          contacts={contacts}
          setActiveContact={setActiveContact}
        />
      )}
      <BottomMobileNav />
    </div>
  );
}

export default Mobile;
