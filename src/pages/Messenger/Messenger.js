import React, { useState, useEffect, useContext } from "react";
import useWindowSize from "../../hooks/useWindowSize/useWindowSize";

import Desktop from "./Desktop/Desktop";
import Mobile from "./Mobile/Mobile";
import { UserContext } from "../Main";
import { firestore, timestamp } from "../../firebase/firebase";

// Launchpad state for active chat represents when a user has selected a new recipient
// to commence a chat with, but has not yet sent a message, so the chat document does not yet exist on firestore.

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
        .orderBy("timestamp", "asc")
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

  const postMessage = async (content) => {
    if (activeChat === "launchpad") {
      let launchPadInfo;
      chats.forEach((chat) => {
        if (chat.chatID === "launchpad") {
          launchPadInfo = chat;
        }
      });
      const newChatDoc = await firestore.collection("chats").add({
        members: [uid, launchPadInfo.contact.id],
        timestamp: timestamp(),
      });
      await firestore
        .collection("chats")
        .doc(newChatDoc.id)
        .collection("messages")
        .add({
          timestamp: timestamp(),
          content: content,
          author: uid,
        });
      setActiveChat(newChatDoc.id);
    } else {
      await firestore
        .collection("chats")
        .doc(activeChat)
        .collection("messages")
        .add({
          timestamp: timestamp(),
          content: content,
          author: uid,
        });
    }
  };

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
        postMessage={postMessage}
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
        postMessage={postMessage}
      />
    );
  } else {
    throw new Error("NO SCREEN SIZE");
  }
}

export default Messenger;
