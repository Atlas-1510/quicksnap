import { storage } from "../firebase/firebase";

async function postToStorage(file, path) {
  const storageRef = storage.ref().child(path);
  await storageRef.put(file);
  const url = await storageRef.getDownloadURL();
  return url;
}

export default postToStorage;
