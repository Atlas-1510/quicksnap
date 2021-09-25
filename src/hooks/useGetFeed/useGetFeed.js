import { firestore } from "../../firebase/firebase";
import { useState, useEffect, useCallback } from "react";

const useGetFeed = (uid) => {
  const [feed, setFeed] = useState([]);
  const [feedUpdate, setFeedUpdate] = useState(true);
  const [latestPost, setLatestPost] = useState();
  const [collection, setCollection] = useState("feed");
  const feedRef = firestore
    .collection("feeds")
    .doc(uid)
    .collection("feedItems")
    .orderBy("timestamp", "desc")
    .limit(5);

  const recentPostsRef = firestore
    .collection("posts")
    .orderBy("timestamp", "desc")
    .limit(5);

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

  const updateFeed = () => {
    setFeed([]);
    setFeedUpdate(true);
  };

  const processSnapshot = useCallback(
    async (snapshot) => {
      try {
        const isSnapshotEmpty = snapshot.size === 0;
        if (!isSnapshotEmpty) {
          const postRefs = [];
          snapshot.forEach((item) => {
            postRefs.push({
              ...item.data(),
              id: item.id,
            });
          });

          const lastPost = snapshot.docs[snapshot.docs.length - 1];
          const nextPosts = await getPosts(postRefs);
          setLatestPost(lastPost);
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
    let ref;
    if (collection === "feed") {
      ref = feedRef;
    } else if (collection === "recent") {
      ref = recentPostsRef;
    }
    const snapshot = await ref.limit(5).startAfter(latestPost).get();
    const response = await processSnapshot(snapshot);
    return response;
  };

  useEffect(() => {
    if (feedUpdate) {
      // This effect gets the users feed items. If the user has less than five feed items,
      // it will also get recent posts by any user to add content to the feed.
      const unsub = feedRef.get().then(async (feedSnapshot) => {
        if (feedSnapshot.size === 5) {
          processSnapshot(feedSnapshot);
        } else if (feedSnapshot.size < 5 && feedSnapshot.size !== 0) {
          setLatestPost();
          setCollection("recent");
          processSnapshot(feedSnapshot);
          recentPostsRef.get().then(async (snapshot) => {
            processSnapshot(snapshot);
          });
        } else if (feedSnapshot.empty) {
          setLatestPost();
          setCollection("recent");
          recentPostsRef.get().then(async (snapshot) => {
            processSnapshot(snapshot);
          });
        }
      });
      setFeedUpdate(false);
      return () => unsub;
    }
  }, [uid, feedUpdate, feedRef, processSnapshot, recentPostsRef]);

  return { feed, updateFeed, fetchMorePosts };
};

export default useGetFeed;
