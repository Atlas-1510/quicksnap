import { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase";

function useGetPostSaveStatus(uid, pid) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const unsub = firestore
      .collection("saves")
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

export default useGetPostSaveStatus;
