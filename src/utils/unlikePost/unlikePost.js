import { firestore } from "../../firebase/firebase";

async function likePost(uid, pid) {
  await firestore.collection("hearts").doc(`${uid}_${pid}`).delete();
  await firestore
    .collection("users")
    .doc(uid)
    .collection("liked")
    .doc(`${uid}_${pid}`)
    .delete();
}
export default likePost;
