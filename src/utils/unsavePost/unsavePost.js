import { firestore } from "../../firebase/firebase";

async function unsavePost(uid, pid) {
  await firestore.collection("saves").doc(`${uid}_${pid}`).delete();
  await firestore
    .collection("users")
    .doc(uid)
    .collection("saves")
    .doc(`${uid}_${pid}`)
    .delete();
}
export default unsavePost;
