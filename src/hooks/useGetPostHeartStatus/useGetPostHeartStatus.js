import { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase";

function useGetPostHeartStatus(uid, pid) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const unsub = firestore
      .collection("hearts")
      .doc(`${uid}_${pid}`)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      });
    return () => unsub();
  }, [pid, uid]);

  return liked;
}

export default useGetPostHeartStatus;
