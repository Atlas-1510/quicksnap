import { firestore } from "../../firebase/firebase";

import { useState, useEffect } from "react";

function useGetUserPosts(uid) {
  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    const unsub = firestore
      .collection("posts")
      .where("author.id", "==", uid)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const posts = snapshot.docs.map((doc, index) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserPosts(posts);
      });
    return () => unsub();
  }, [uid]);

  return userPosts;
}

export default useGetUserPosts;
