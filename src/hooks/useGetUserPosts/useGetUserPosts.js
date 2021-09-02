import { firestore, storage } from "../../firebase/firebase";

import { useState, useEffect } from "react";

function useGetUserPosts(uid) {
  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    const unsub = firestore
      .collection("posts")
      .where("author.id", "==", uid)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const promises = snapshot.docs.map((doc) => {
          return storage.refFromURL(doc.data().image).getDownloadURL();
        });
        Promise.all(promises).then((downloadURLs) => {
          const posts = snapshot.docs.map((doc, index) => ({
            id: doc.id,
            ...doc.data(),
            image: downloadURLs[index],
          }));
          setUserPosts(posts);
        });
      });
    return () => unsub();
  }, []);

  return userPosts;
}

export default useGetUserPosts;

// TODO: Paginate, limit to 12 results at a time

// source: https://stackoverflow.com/questions/60637671/how-can-i-download-images-from-firebase-storage-and-assign-them-as-a-prop-to-doc
