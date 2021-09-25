import { firestore } from "../../firebase/firebase";
import { useState, useEffect } from "react";

// TODO: add pagination, remove limit of 5 most recent feed items

const useGetFeed = (uid) => {
  const [feed, setFeed] = useState([]);
  const [feedUpdate, setFeedUpdate] = useState(true);

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

  async function getRecentPosts() {
    const recentPosts = await firestore
      .collection("posts")
      .orderBy("timestamp")
      .limit(5)
      .get()
      .then((snap) => {
        return snap.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      });
    return recentPosts;
  }

  const updateFeed = () => {
    setFeedUpdate(true);
  };

  useEffect(() => {
    if (feedUpdate) {
      const unsub = firestore
        .collection("feeds")
        .doc(uid)
        .collection("feedItems")
        .orderBy("timestamp", "desc")
        // .limit(5)
        .get()
        .then(async (snapshot) => {
          const feedItems = [];
          snapshot.forEach((item) => {
            feedItems.push({
              ...item.data(),
              id: item.id,
            });
          });
          if (feedItems.length === 0) {
            const recentPosts = await getRecentPosts();
            setFeed(recentPosts);
          } else {
            const posts = await getPosts(feedItems);
            setFeed(posts);
          }
          setFeedUpdate(false);
        });
      return () => unsub;
    }
  }, [uid, feedUpdate]);

  return { feed, updateFeed };
};

export default useGetFeed;
