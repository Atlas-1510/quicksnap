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

      if (suggestions.length < 5) {
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
        const collection = firestore
          .collection("users")
          .orderBy("followerCount");
        let index = 0;

        do {
          let current = collection.limit(5).startAt(index);
          const snapshot = await current.get();
          const docs = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log(docs);
          docs.forEach((doc) => {
            if (!user.following.includes(doc.id)) {
              if (!suggestions.some((suggestion) => suggestion.id === doc.id)) {
                suggestions.push({ ...doc });
              }
            }
          });
          console.log(suggestions);
          index += docs.length;
          if (index >= userCount) {
            break;
          }
        } while (suggestions.length < 5);
      }

      //     do {
      //       let docs = await current
      //         .get()
      //         .then((snapshot) => snapshot.map((doc) => doc.data()));
      //       console.log(docs);
      //       docs.forEach((doc) => {
      //         if (!user.following.includes(doc.id)) {
      //           if (!suggestions.some((suggestion) => suggestion.id === doc.id)) {
      //             suggestions.push({ ...doc.data() });
      //           }
      //         }
      //       });
      //       index += docs.length;
      //       if (index <= userCount) {
      //         current = collection.startAfter(index);
      //       } else {
      //         break;
      //       }
      //     } while (suggestions.length < 5);
      //   }

      setFollowSuggestions(suggestions);
    })();
  }, [user]);
  return followSuggestions;
}
