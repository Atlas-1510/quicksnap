import { firestore, storage } from "../../../firebase/firebase";

export default async function getLikedPosts(uid) {
  const ref = firestore.collection("users").doc(uid).collection("liked");
  const snap = await ref.get();
  const docs = [];
  for (const doc of snap.docs) {
    const imgRef = doc.data().image;
    const image = await storage.refFromURL(imgRef).getDownloadURL();
    docs.push({ ...doc.data(), id: doc.id, image });
  }
  // TODO: paginate this to return 12 results at a time (to fill grid, and then scroll down for more)
  //www.youtube.com/watch?v=yFlhTvxcrQ8

  return docs;
}
