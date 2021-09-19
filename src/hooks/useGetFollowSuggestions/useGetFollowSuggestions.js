import { useState, useEffect } from "react";

import getUserInfo from "../../utils/getUserInfo/getUserInfo";
import { firestore } from "../../firebase/firebase";

export default function useGetFollowSuggestions(user) {
  const [followSuggestions, setFollowSuggestions] = useState([]);

  useEffect(() => {
    (async () => {
      const suggestions = [];
      const followNotFollowing = [];
      user.followers.forEach((followerID) => {
        if (!user.following.includes(followerID)) {
          followNotFollowing.push(followerID);
        }
      });
      console.log(followNotFollowing);
      const promises = [];
      followNotFollowing.forEach(async (id) => {
        const user = getUserInfo(id);
        promises.push(user);
      });
      await Promise.all(promises).then((results) => {
        console.log(results);
        suggestions.push(...results);
      });

      if (suggestions.length < 6) {
        const userCount = await firestore
          .collection("counts")
          .doc("users")
          .get()
          .then((res) => {
            return res.data();
          })
          .then((data) => {
            return data.count;
          });
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

            if (!user.following.includes(doc.id)) {
              if (!suggestions.some((suggestion) => suggestion.id === doc.id)) {
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
  }, [user]);
  return followSuggestions;
}
