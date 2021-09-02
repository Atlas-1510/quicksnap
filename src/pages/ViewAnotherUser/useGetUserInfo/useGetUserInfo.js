import { useState, useEffect } from "react";
import { firestore } from "../../../firebase/firebase";

function useGetUserInfo(id) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const userRef = firestore.collection("users").doc(id);
      const userDoc = await userRef.get();
      const user = userDoc.data();
      setUserInfo(user);
    })();
  }, [id]);

  return userInfo;
}

export default useGetUserInfo;
