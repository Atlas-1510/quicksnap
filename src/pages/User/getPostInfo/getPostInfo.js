// TODO: Relocate this so that it can be used by the Home page to get get post information for each Card component

// TODO: Make tests for getPostInfo

import { firestore, storage } from "../../../firebase/firebase";

export default async function getPostInfo(id) {
  const ref = firestore.collection("posts").doc(id);
  const doc = await ref.get();
  const imgRef = doc.data().image;
  const image = await storage.refFromURL(imgRef).getDownloadURL();
  return { ...doc.data(), image };
}
