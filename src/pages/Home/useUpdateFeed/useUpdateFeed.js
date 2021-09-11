import { firestore } from "../../../firebase/firebase";
import { useState, useEffect } from "react";

// TODO: add pagination, remove limit of 5 most recent feed items

const useUpdateFeed = (uid) => {
  const [feed, setFeed] = useState([]);

  async function getPosts(items) {
    const promises = [];

    items.forEach((item) => {
      const promise = firestore.collection("posts").doc(item.id).get();
      promises.push(promise);
    });

    const posts = [];
    await Promise.all(promises).then((results) => {
      results.forEach((result) => {
        const post = result.data();
        posts.push({
          ...post,
          id: result.id,
        });
      });
    });

    return posts;
  }

  useEffect(() => {
    const unsub = firestore
      .collection("feeds")
      .doc(uid)
      .collection("feedItems")
      .orderBy("timestamp", "desc")
      .limit(5)
      .onSnapshot(async (snapshot) => {
        const feedItems = [];
        snapshot.forEach((item) => {
          feedItems.push({
            ...item.data(),
            id: item.id,
          });
        });
        const posts = await getPosts(feedItems);
        setFeed(posts);
      });
    return () => unsub;
  }, [uid]);

  return feed;
};

export default useUpdateFeed;
