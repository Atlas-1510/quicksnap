import React, { useContext } from "react";
import { UserContext } from "../../App";

export default function ChatBox({ messages }) {
  const user = useContext(UserContext);
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
