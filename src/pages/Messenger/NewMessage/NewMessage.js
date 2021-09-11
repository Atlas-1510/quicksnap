import React, { useState, useContext } from "react";
import ChevronLeft from "../../../images/SVG/ChevronLeft";
import useComponentVisible from "../../../hooks/useComponentVisible/useComponentVisible";
import algoliasearch from "algoliasearch/lite";
import { UserContext } from "../../Main";

const searchClient = algoliasearch(
  "JB4UGTXL86",
  "376e4fa2201e0406edaba9dd56057475"
);
const index = searchClient.initIndex("quicksnap_users");

export default function NewMessage({
  exit,
  setContacts,
  contacts,
  setActiveContact,
}) {
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

  const handleContactSelection = (e) => {
    const userid = e.target.dataset.userid;
    let user = searchResults.find((contact) => contact.id === userid);
    if (!contacts.find((contact) => contact.id === userid)) {
      setContacts([...contacts, user]);
    }
    setActiveContact(user);
    exit();
  };

  return (
    <div ref={ref}>
      {isComponentVisible && (
        <div
          className="h-full flex flex-col"
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
          <div className="flex flex-col overflow-y-scroll">
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
            {searchResults &&
              searchResults.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center m-2"
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
      )}
    </div>
  );
}
