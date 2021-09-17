import { firestore, storage } from "../../firebase/firebase";

export default async function getPostInfo(id) {
  const ref = firestore.collection("posts").doc(id);
  const doc = await ref.get();
  const imgRef = doc.data().image;
  // To handle firebase storage emulator. .refFromURL() doesn't work with locally stored files in the emulator.
  let image;
  const regex = new RegExp(/localhost:9199/);
  if (!regex.test(imgRef)) {
    image = await storage.refFromURL(imgRef).getDownloadURL();
  } else {
    image = doc.data().image;
  }

  return { ...doc.data(), image, id: doc.id };
}

// TODO: paginate this to return 12 results at a time (to fill grid, and then scroll down for more)
//www.youtube.com/watch?v=yFlhTvxcrQ8
