import { firestore, timestamp } from "../../firebase/firebase";

async function likePost(uid, pid) {
  await firestore.collection("hearts").doc(`${uid}_${pid}`).set({
    timestamp: timestamp(),
    uid,
    pid,
  });
}

export default likePost;
