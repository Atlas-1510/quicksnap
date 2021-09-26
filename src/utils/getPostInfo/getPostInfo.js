import { firestore } from "../../firebase/firebase";

export default async function getPostInfo(id) {
  const ref = firestore.collection("posts").doc(id);
  const doc = await ref.get();

  return { ...doc.data(), id: doc.id };
}
