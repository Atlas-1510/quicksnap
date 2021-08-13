import React, { useState, useEffect } from "react";
import useIsFirstRender from "../../hooks/useIsFirstRender/useIsFirstRender";
import useWindowSize from "../../hooks/useWindowSize/useWindowSize";
import { Link } from "react-router-dom";

import Write from "../../images/SVG/Write";
import ChevronDown from "../../images/SVG/ChevronDown";
import PaperAirplane from "../../images/SVG/PaperAirplane/PaperAirplane";
import ChevronLeft from "../../images/SVG/ChevronLeft";
import ModalBackground from "../../components/ModalBackground";

import getContacts from "./getContacts";
import getMessages from "./getMessages";

// TODO: Remove this test image when no longer required
import Matt from "../../images/test-images/RightSideBox/mattohalleron12.png";

function Messenger({ user, setCurrentPage }) {
  const isFirstRender = useIsFirstRender();
  const screenSize = useWindowSize();
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState(false);

  useEffect(() => {
    //TODO: Replace getContacts with firebase call. Remember to update tests to mock firebase instead of getContacts
    let newContacts = getContacts();
    setContacts(newContacts);
  }, []);

  const handleClick = (e) => {
    const userid = e.target.dataset.userid;
    let user = contacts.find((contact) => contact.id === userid);
    setActiveContact(user);
  };

  useEffect(() => {
    if (!isFirstRender) {
      //TODO: Replace getMessages with firebase call. Remember to update tests to mock firebase instead of getMessages
      setMessages(getMessages(activeContact));
    }
  }, [activeContact]);

  // Mobile messenger - max width of 768 based on tailwind screen sizes
  if (screenSize.width < 768) {
    return (
      <div className=" bg-white absolute top-0 w-full h-full ">
        {!activeContact && !newMessage && (
          <div className="h-full flex flex-col">
            <div className="border-b border-gray-300 flex items-center justify-between py-2">
              <Link to="/" onClick={() => setCurrentPage("home")}>
                <div className="mx-2 w-7">
                  <ChevronLeft />
                </div>
              </Link>
              <div className="my-1 flex items-center">
                <span className="font-semibold text-sm">iamjasona</span>
                <div className="w-6">
                  <ChevronDown />
                </div>
              </div>
              <div className=" mx-2 w-7" onClick={() => setNewMessage(true)}>
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
                    <span className="font-semibold text-sm">
                      {contact.name}
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
        {activeContact && !newMessage && (
          <div className="h-full flex flex-col">
            <div className="border-b border-gray-300 flex items-center justify-between py-2">
              <div
                className=" mx-2 w-7 md:invisible"
                onClick={() => setActiveContact(null)}
                data-testid="mobile-return-messenger-main"
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
              <div className=" mx-2 w-7">
                <Write />
              </div>
            </div>
            {messages && <ChatBox messages={messages} user={user} />}
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
      </div>
    );
  }
  // Desktop messenger
  else {
    return (
      <div
        className=" my-7 bg-white border rounded-md border-gray-300 
      grid grid-cols-3 top-0 static w-full h-5/6"
      >
        <div className="col-span-1 h-full flex flex-col">
          <div className="border-b border-gray-300 flex items-center justify-between py-2">
            <div className=" mx-2 w-7 invisible">
              <ChevronLeft />
            </div>
            <div className="my-1 flex items-center">
              <span className="font-semibold text-sm">iamjasona</span>
              <div className="w-6">
                <ChevronDown />
              </div>
            </div>
            <div className=" mx-2 w-7" onClick={() => setNewMessage(true)}>
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
              <button className="bg-blue-500 my-3 py-1 px-2 border-0 rounded-sm text-white hover:shadow-inner hover:bg-blue-400">
                Send Message
              </button>
            </div>
          )}
          {messages && <ChatBox messages={messages} user={user} />}
          {newMessage && (
            <ModalBackground closeFunction={() => setNewMessage(false)}>
              <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-white border rounded-md border-gray-300">
                <NewMessage
                  setNewMessage={setNewMessage}
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
}

function ChatBox({ messages, user }) {
  return (
    <div className="flex flex-col h-full ">
      <div className="flex flex-col h-full  justify-end">
        {messages.map((message) => {
          if (message.authorID === user.id) {
            return (
              <div key={message.id} className="flex justify-end mx-1 text-sm">
                <span
                  className=" bg-blue-500 text-white py-2 px-2 m-3 border-0 rounded-3xl"
                  style={{ maxWidth: "70%" }}
                >
                  {message.content}
                </span>
              </div>
            );
          } else {
            return (
              <div key={message.id} className="flex justify-start mx-1 text-sm">
                <span
                  className="bg-gray-300 py-2 px-2 m-3 border-0 rounded-3xl"
                  style={{ maxWidth: "70%" }}
                >
                  {message.content}
                </span>
              </div>
            );
          }
        })}
      </div>
      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Message..."
          className="border border-gray-300 rounded-3xl m-4 p-2 w-full"
        />
      </div>
    </div>
  );
}

function NewMessage({
  setNewMessage,
  setContacts,
  contacts,
  setActiveContact,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (searchInput !== "") {
      setSearchResults(getSearchResults());
    } else {
      setSearchResults(null);
    }
  }, [searchInput]);

  // TODO: Implement firebase call to get similar contact names from input search query
  const getSearchResults = () => {
    const knownContacts = getContacts();
    const newContact = {
      id: "random ID 4",
      name: "An New User We Dont Already Know",
      image: Matt,
    };
    return [...knownContacts, newContact];
  };

  const handleContactSelection = (e) => {
    const userid = e.target.dataset.userid;
    let user = searchResults.find((contact) => contact.id === userid);
    if (!contacts.find((contact) => contact.id === userid)) {
      setContacts([...contacts, user]);
    }
    setActiveContact(user);
    setNewMessage(false);
  };

  return (
    <div className="h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
      <div className="border-b border-gray-300 flex items-center justify-between py-2 relative">
        <div className="mx-2 w-7" onClick={() => setNewMessage(false)}>
          <ChevronLeft />
        </div>
        <span className="font-semibold text-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          New Message
        </span>
      </div>
      <div className="flex flex-col overflow-y-scroll">
        <div className="flex px-2 py-3 border-b border-gray-300">
          <span className="font-semibold mr-2">To:</span>
          <form className="w-full">
            <input
              className="w-full"
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
        </div>
        {searchResults &&
          searchResults.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center m-2"
              data-userid={contact.id}
              onClick={(e) => handleContactSelection(e)}
            >
              <img
                src={contact.image}
                alt="contact"
                className="border rounded-full h-12 pointer-events-none"
                data-testid={`user-image-${contact.id}`}
              />
              <div className="ml-3 flex flex-col pointer-events-none">
                <span className="font-semibold text-sm">{contact.name}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Messenger;
