import React from "react";

import Write from "../images/SVG/Write";
import ChevronDown from "../images/SVG/ChevronDown";

import davidBarrell from "../images/test-images/RightSideBox/david.barrell.png";
import deshith from "../images/test-images/RightSideBox/deshith.png";
import lisa from "../images/test-images/RightSideBox/lisamwill.png";
import PaperAirplane from "../images/SVG/PaperAirplane/PaperAirplane";
import ChevronLeft from "../images/SVG/ChevronLeft";

const testContacts = [
  {
    id: "random ID 1",
    userName: "david.barrell",
    image: davidBarrell,
  },
  {
    id: "random ID 2",
    userName: "deshith",
    image: deshith,
  },
  {
    id: "random ID 3",
    userName: "lisamwil",
    image: lisa,
  },
];

function Messenger() {
  const messages = false;

  return (
    <div
      className=" md:my-7 bg-white md:border rounded-md border-gray-300 
      grid grid-cols-3 absolute top-0 md:static w-full h-full md:h-5/6"
    >
      <div className="md:static col-span-3 md:col-span-1 h-full flex flex-col">
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
          {testContacts.map((contact) => (
            <div key={contact.id} className="flex items-center m-2">
              <img
                src={contact.image}
                alt="contact"
                className="border rounded-full h-12 h-12"
              />
              <div className="ml-3 flex flex-col">
                <span className="font-semibold text-sm">
                  {contact.userName}
                </span>
                <span className="text-gray-500 text-xs">last message XYZ</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:flex col-span-2 h-full border-l border-gray-300 flex-col justify-center">
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
      </div>
    </div>
  );
}

export default Messenger;
