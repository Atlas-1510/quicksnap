import { useState, useEffect } from "react";

import getUserInfo from "../../utils/getUserInfo/getUserInfo";
import { firestore } from "../../firebase/firebase";

export default function useGetFollowSuggestions(user) {
  const [followSuggestions, setFollowSuggestions] = useState([]);
  const { followers, following } = user;

  useEffect(() => {
    if (followers && following) {
      (async () => {
        const suggestions = [];
        const followNotFollowing = [];
        followers.forEach((followerID) => {
          if (!following.includes(followerID)) {
            followNotFollowing.push(followerID);
          }
        });
        const promises = [];
        followNotFollowing.forEach(async (id) => {
          const user = getUserInfo(id);
          promises.push(user);
        });
        await Promise.all(promises).then((results) => {
          suggestions.push(...results);
        });

        if (suggestions.length < 6) {
          let collection = firestore
            .collection("users")
            .orderBy("followerCount")
            .limit(1);

          let current = collection;

          do {
            const snapshot = await current.get();
            if (snapshot.docs.length > 0) {
              const singleElementArray = snapshot.docs.map((doc) => {
                return {
                  ...doc.data(),
                  id: doc.id,
                };
              });
              const doc = singleElementArray[0];

              if (!following.includes(doc.id)) {
                if (
                  !suggestions.some((suggestion) => suggestion.id === doc.id)
                ) {
                  suggestions.push({ ...doc });
                }
              }
              let last = snapshot.docs[snapshot.docs.length - 1];
              current = collection.startAfter(last);
            } else {
              break;
            }
          } while (suggestions.length < 6);
        }

        setFollowSuggestions(suggestions);
      })();
    }
  }, [followers, following]);
  return followSuggestions;
}
