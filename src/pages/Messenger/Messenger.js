import React, { useState, useEffect, useContext } from "react";
import useWindowSize from "../../hooks/useWindowSize/useWindowSize";

import Desktop from "./Desktop/Desktop";
import Mobile from "./Mobile/Mobile";
// import useGetChats from "../../hooks/useGetChats/useGetChats";
// import useGetMessages from "../../hooks/useGetMessages/useGetMessages";
import { UserContext } from "../Main";
import { firestore } from "../../firebase/firebase";

function Messenger({ setCurrentPage }) {
  const { width } = useWindowSize();
  const { uid } = useContext(UserContext);
  const [chats, setChats] = useState(null);
  useEffect(() => {
    const unsub = firestore
      .collection("chats")
      .where("members", "array-contains", uid)
      .orderBy("timestamp", "desc")
      .onSnapshot((snap) => {
        let chatDocs = [];
        snap.forEach((chat) => {
          chatDocs.push({ ...chat.data(), chatID: chat.id });
        });
        chatDocs = chatDocs.map((chat) => {
          let membersWithoutCurrentUser = chat.members.filter(
            (id) => id !== uid
          );
          let resolve = {
            ...chat,
            contact: membersWithoutCurrentUser[0],
            members: undefined,
          };
          return resolve;
        });
        const promises = [];
        chatDocs.forEach((doc) => {
          const promise = firestore.collection("users").doc(doc.contact).get();
          promises.push(promise);
        });
        const users = [];
        Promise.all(promises).then((results) => {
          results.forEach((result) => {
            const user = result.data();
            users.push({ ...user, id: result.id });
          });
          users.forEach((user) => {
            chatDocs.forEach((doc) => {
              if (user.id === doc.contact) {
                doc.contact = user;
              }
            });
          });

          setChats(chatDocs);
        });
      });
    return () => unsub();
  }, [uid]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    if (activeChat && activeChat !== "launchpad") {
      console.log(`useGetChats chatID: ${activeChat}`);
      const unsub = firestore
        .collection("chats")
        .doc(activeChat)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .limit(10)
        .onSnapshot((snap) => {
          const msgDocs = [];
          snap.forEach((msg) => {
            msgDocs.push({ ...msg.data(), id: msg.id });
          });
          setMessages(msgDocs);
        });
      return () => unsub();
    } else if (activeChat === "launchpad") {
      setMessages([]);
    }
  }, [activeChat]);

  const [newMessage, setNewMessage] = useState(false);

  useEffect(() => {
    console.log(chats);
  }, [chats]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  // Mobile messenger - max width of 768 based on tailwind screen sizes
  if (width < 768) {
    return (
      <Mobile
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        setCurrentPage={setCurrentPage}
      />
    );
  } else if (width >= 768) {
    return (
      <Desktop
        chats={chats}
        setChats={setChats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        messages={messages}
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
