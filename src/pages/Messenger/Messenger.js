import React, { useState, useEffect } from "react";
import useIsFirstRender from "../../hooks/useIsFirstRender/useIsFirstRender";
import useWindowSize from "../../hooks/useWindowSize/useWindowSize";

import getContacts from "./getContacts";
import getMessages from "./getMessages";

import Desktop from "./Desktop";
import Mobile from "./Mobile";

function Messenger({ setCurrentPage }) {
  const isFirstRender = useIsFirstRender();
  const { width } = useWindowSize();
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
  if (width < 768) {
    return (
      <Mobile
        handleClick={handleClick}
        contacts={contacts}
        setContacts={setContacts}
        activeContact={activeContact}
        setActiveContact={setActiveContact}
        messages={messages}
        setMessages={setMessages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        setCurrentPage={setCurrentPage}
      />
    );
  } else if (width >= 768) {
    return (
      <Desktop
        handleClick={handleClick}
        contacts={contacts}
        setContacts={setContacts}
        activeContact={activeContact}
        setActiveContact={setActiveContact}
        messages={messages}
        setMessages={setMessages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        setCurrentPage={setCurrentPage}
      />
    );
  } else {
    throw new Error("NO SCREEN SIZE");
  }
}

export default Messenger;
