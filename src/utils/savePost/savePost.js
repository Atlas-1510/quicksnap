import { firestore, timestamp } from "../../firebase/firebase";

async function savePost(uid, pid) {
  // The "saves" collections is maintained to track if a user has saved a post.
  await firestore.collection("saves").doc(`${uid}_${pid}`).set({
    timestamp: timestamp(),
    uid,
    pid,
  });
  // The collection below is maintained to populate the "Saved" section when a user views their own profile page
  await firestore
    .collection("users")
    .doc(uid)
    .collection("saves")
    .doc(`${uid}_${pid}`)
    .set({
      postID: pid,
      timestamp: timestamp(),
    });
}

export default savePost;
