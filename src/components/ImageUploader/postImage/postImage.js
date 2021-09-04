import { storage, firestore, timestamp } from "../../../firebase/firebase";

// TODO: implement uuid for uploaded file name, to avoid issues if two photos have the same name

export default async function postImage(user, image) {
  // TODO: replace logic below with postToStorage.js
  const storageRef = storage.ref().child(`${user.uid}/posts/${image.name}`);
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
  });
}
