import { firestore } from "../../firebase/firebase";

export default async function deletePost(pid) {
  // this deletes a post. Associated, hearts, saves, comments, feed references are deleted
  // using a backend cloud function.
  await firestore.collection("posts").doc(pid).delete();
}
