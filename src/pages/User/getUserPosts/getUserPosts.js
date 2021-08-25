import { firestore } from "../../../firebase/firebase";

export default async function getUserPosts(uid) {
  const ref = firestore.collection("posts").where("authorID", "==", uid);
  const snap = await ref.get();
  const docs = [];
  for (const doc of snap.docs) {
    console.log(doc.id, "=>", doc.data());
    docs.push({ ...doc.data(), id: doc.id });
  }

  return docs;
}
