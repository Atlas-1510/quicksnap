import React, { useContext } from "react";
import { UserContext } from "../../Main";

export default function ChatBox({ messages, postMessage }) {
  const user = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    postMessage(e.target[0].value);
    document.getElementById("comment-form").reset();
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex  h-full overflow-scroll flex-col-reverse">
        {messages.map((message) => {
          if (message.author === user.uid) {
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

      <form
        action="#"
        onSubmit={(e) => handleSubmit(e)}
        className="flex items-center justify-center"
        id="comment-form"
      >
        <input
          type="text"
          placeholder="Message..."
          className="border border-gray-300 rounded-3xl m-4 py-2 px-3 w-full focus:outline-none focus:ring-1 focus:border-blue-300"
        />

        <button className="hidden" type="submit"></button>
      </form>
    </div>
  );
}
