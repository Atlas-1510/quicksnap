import React, { useState, useEffect } from "react";
import useIsFirstRender from "../../hooks/useIsFirstRender/useIsFirstRender";
import useWindowSize from "../../hooks/useWindowSize/useWindowSize";

import Write from "../../images/SVG/Write";
import ChevronDown from "../../images/SVG/ChevronDown";

import PaperAirplane from "../../images/SVG/PaperAirplane/PaperAirplane";
import ChevronLeft from "../../images/SVG/ChevronLeft";

import getContacts from "./getContacts";
import getMessages from "./getMessages";

function Messenger() {
  const isFirstRender = useIsFirstRender();
  const screenSize = useWindowSize();
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState(null);

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
        {!activeContact && (
          <div className="h-full flex flex-col">
            <div className="border-b border-gray-300 flex items-center justify-between py-2">
              <div className=" mx-2 w-7 md:invisible">
                <ChevronLeft />
              </div>
              <div className="my-1 flex items-center">
                <span className="font-semibold text-sm">iamjasona</span>
                <div className="w-6">
                  <ChevronDown />
                </div>
              </div>
              <div className=" mx-2 w-7">
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
        {activeContact && (
          <div className="h-full flex flex-col">
            <div className="border-b border-gray-300 flex items-center justify-between py-2">
              <div className=" mx-2 w-7 md:invisible">
                <ChevronLeft />
              </div>
              <div className="my-1 flex items-center">
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
            {messages &&
              messages.map((message) => (
                <div key={message.id}>{message.content}</div>
              ))}
          </div>
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
            <div className=" mx-2 w-7">
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
          {messages &&
            messages.map((message) => (
              <div key={message.id}>{message.content}</div>
            ))}
        </div>
      </div>
    );
  }
}

export default Messenger;
