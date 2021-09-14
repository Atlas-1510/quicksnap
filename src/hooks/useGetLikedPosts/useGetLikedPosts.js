import { firestore } from "../../firebase/firebase";
import { useState, useEffect } from "react";

export default function useGetLikedPosts(uid) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsub = firestore
      .collection("users")
      .doc(uid)
      .collection("liked")
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

  // TODO: paginate this to return 12 results at a time (to fill grid, and then scroll down for more)
  //www.youtube.com/watch?v=yFlhTvxcrQ8
  return posts;
}
