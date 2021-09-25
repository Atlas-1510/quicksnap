import { firestore } from "../../firebase/firebase";
import { useState, useEffect, useCallback } from "react";

// TODO: add pagination, remove limit of 5 most recent feed items

const useGetFeed = (uid) => {
  const [feed, setFeed] = useState([]);
  const [feedUpdate, setFeedUpdate] = useState(true);
  const [latestPost, setLatestPost] = useState();
  const feedRef = firestore
    .collection("feeds")
    .doc(uid)
    .collection("feedItems")
    .orderBy("timestamp", "desc");

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

  const processFeedSnapshot = useCallback(
    async (snapshot) => {
      try {
        const isSnapshotEmpty = snapshot.size === 0;
        if (!isSnapshotEmpty) {
          const feedItems = [];
          snapshot.forEach((item) => {
            feedItems.push({
              ...item.data(),
              id: item.id,
            });
          });

          const lastDoc = snapshot.docs[snapshot.docs.length - 1];
          const nextPosts = await getPosts(feedItems);
          setLatestPost(lastDoc);
          setFeed([...feed, ...nextPosts]);
          return "success";
        } else {
          return "no-more-posts";
        }
      } catch (err) {
        console.log(err);
        return "failure";
      }
    },
    [feed]
  );

  const fetchMorePosts = async () => {
    const snapshot = await feedRef.limit(5).startAfter(latestPost).get();
    const response = await processFeedSnapshot(snapshot);
    return response;
  };

  useEffect(() => {
    if (feedUpdate) {
      const unsub = feedRef
        .limit(5)
        .get()
        .then(async (snapshot) => processFeedSnapshot(snapshot));
      setFeedUpdate(false);
      return () => unsub;
    }
  }, [uid, feedUpdate, feedRef, processFeedSnapshot]);

  return { feed, updateFeed, fetchMorePosts };
};

export default useGetFeed;

// To get posts from famous people when user first signs up and has an empty feed, because they are not following anyone yet.

// if (feedItems.length === 0) {
//   const recentPosts = await getRecentPosts();
//   setFeed(recentPosts);
// } else {
