import { firestore, timestamp } from "../../firebase/firebase";

async function likePost(uid, pid) {
  // The "hearts" collections is maintained to populate the Liked By section for each post
  await firestore.collection("hearts").doc(`${uid}_${pid}`).set({
    timestamp: timestamp(),
    uid,
    pid,
  });
  // The collection below is maintained to populate the "Liked" section when a user views their own profile page
  await firestore
    .collection("users")
    .doc(uid)
    .collection("liked")
    .doc(`${uid}_${pid}`)
    .set({
      postID: pid,
      timestamp: timestamp(),
    });
}

export default likePost;
