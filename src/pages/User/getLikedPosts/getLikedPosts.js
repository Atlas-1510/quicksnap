import { firestore } from "../../../firebase/firebase";

export default async function getLikedPosts(uid) {
  const ref = firestore.collection("users").doc(uid).collection("liked");
  const snap = await ref.get();
  const docs = [];
  for (const doc of snap.docs) {
    docs.push({ ...doc.data(), id: doc.id });
  }
  // TODO: paginate this to return 12 results at a time (to fill grid, and then scroll down for more)
  //www.youtube.com/watch?v=yFlhTvxcrQ8

  return docs;
}
