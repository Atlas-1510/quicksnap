import React, { useState, useContext } from "react";
import ChevronLeft from "../../../images/SVG/ChevronLeft";
import useComponentVisible from "../../../hooks/useComponentVisible/useComponentVisible";
import algoliasearch from "algoliasearch/lite";
import { UserContext } from "../../Main";
import getUserInfo from "../../../utils/getUserInfo/getUserInfo";

const searchClient = algoliasearch(
  "JB4UGTXL86",
  "376e4fa2201e0406edaba9dd56057475"
);
const index = searchClient.initIndex("quicksnap_users");

export default function NewChat({ exit, chats, setChats, setActiveChat }) {
  const { ref, isComponentVisible } = useComponentVisible(true, exit);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const { uid } = useContext(UserContext);

  const updateSearch = async (e) => {
    setSearchInput(e.target.value);
    const { hits } = await index.search(searchInput);
    const filteredHits = hits.filter((hit) => hit.id !== uid);
    setSearchResults(filteredHits);
  };

  const handleContactSelection = async (e) => {
    const contactID = e.target.dataset.userid;
    const existingChat = chats.find((chat) => {
      // If the members array of the chat has two elements
      // and one of them is the contactID, and the other is the UID
      // return the chat id
      const chatContact = chat.contact.id;
      if (chatContact === contactID) {
        return true;
      } else {
        return false;
      }
    });
    if (existingChat) {
      setActiveChat(existingChat.chatID);
      exit();
      return;
    }

    const launchpad = {
      chatID: "launchpad",
      contact: await getUserInfo(contactID),
      members: [uid, contactID],
    };

    setChats([launchpad, ...chats]);
    setActiveChat(launchpad.chatID);
    exit();
    return;
  };

  return (
    <div ref={ref} className="flex flex-col flex-grow">
      {isComponentVisible && (
        <div
          className="flex flex-col flex-grow"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-gray-300 flex items-center justify-between py-2 relative">
            <div className="mx-2 w-7" onClick={() => exit()}>
              <ChevronLeft />
            </div>
            <span className="font-semibold text-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              New Message
            </span>
          </div>
          <div className="flex flex-col h-full flex-grow">
            <div className="flex px-2 py-3 border-b border-gray-300">
              <span className="font-semibold mr-2">To:</span>
              <form className="w-full">
                <input
                  aria-label="Search for contact"
                  className="w-full"
                  type="text"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={(e) => updateSearch(e)}
                />
              </form>
            </div>
            <div className="flex-grow">
              {searchResults &&
                searchResults.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center m-2 cursor-pointer"
                    data-userid={contact.id}
                    onClick={(e) => handleContactSelection(e)}
                  >
                    <img
                      src={contact.profileImage}
                      alt="contact"
                      className="border rounded-full h-12 pointer-events-none"
                      data-testid={`user-image-${contact.id}`}
                    />
                    <div className="ml-3 flex flex-col pointer-events-none">
                      <span className="font-semibold text-sm">
                        {contact.name}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
