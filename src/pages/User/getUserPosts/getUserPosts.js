import { firestore, storage } from "../../../firebase/firebase";

export default async function getUserPosts(uid) {
  const ref = firestore.collection("posts").where("author.id", "==", uid);
  const snap = await ref.get();
  const docs = [];
  for (const doc of snap.docs) {
    const imgRef = doc.data().image;
    const image = await storage.refFromURL(imgRef).getDownloadURL();
    docs.push({ ...doc.data(), id: doc.id, image });
  }

  return docs;
}

// TODO: Paginate, limit to 12 results at a time
