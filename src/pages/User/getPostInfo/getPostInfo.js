// TODO: Relocate this so that it can be used by the Home page to get get post information for each Card component

import { firestore, storage } from "../../../firebase/firebase";

export default async function getPostInfo(id) {
  const ref = firestore.collection("posts").doc(id);
  const doc = await ref.get();
  const imgRef = doc.data().image;
  const image = await storage.refFromURL(imgRef).getDownloadURL();
  return { ...doc.data(), image };
}

// TODO: paginate this to return 12 results at a time (to fill grid, and then scroll down for more)
//www.youtube.com/watch?v=yFlhTvxcrQ8
