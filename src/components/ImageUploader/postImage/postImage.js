import { storage, firestore, timestamp } from "../../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";

// TODO: implement uuid for uploaded file name, to avoid issues if two photos have the same name

export default async function postImage(user, image) {
  // TODO: replace logic below with postToStorage.js
  // replace name
  const nameOld = image.name;
  const suffix = nameOld.match(/\.[0-9a-z]+$/i)[0];
  const nameNew = `${uuidv4()}${suffix}`;

  //
  const storageRef = storage.ref().child(`${user.uid}/posts/${nameNew}`);
  await storageRef.put(image);
  const imageURL = await storageRef.getDownloadURL();

  await firestore.collection("posts").add({
    author: {
      name: user.name,
      profileImage: user.profileImage,
      id: user.uid,
    },
    timestamp: timestamp(),
    image: imageURL,
    likeCount: 0,
    comments: [],
    likedBy: [],
    fileName: nameNew,
  });
}
