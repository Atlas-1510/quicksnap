import { firestore } from "../../firebase/firebase";
import { useState, useEffect } from "react";

export default function useGetSavedPosts(uid) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsub = firestore
      .collection("users")
      .doc(uid)
      .collection("saves")
      .orderBy("timestamp", "desc")
      .onSnapshot((snap) => {
        const promises = snap.docs.map((doc) => {
          doc = doc.data();
          const { postID } = doc;
          return firestore.collection("posts").doc(postID).get();
        });
        Promise.all(promises).then((result) => {
          const postDocs = result.map((result) => ({
            id: result.id,
            ...result.data(),
          }));
          setPosts(postDocs);
        });
      });
    return () => unsub();
  }, [uid]);
  return posts;
}
