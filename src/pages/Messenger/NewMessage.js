import React, { useState, useEffect } from "react";

import ChevronLeft from "../../images/SVG/ChevronLeft";

import getContacts from "./getContacts";

import Matt from "../../images/test-images/RightSideBox/mattohalleron12.png";

export default function NewMessage({
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
