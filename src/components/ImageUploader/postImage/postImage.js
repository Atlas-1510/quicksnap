import { storage, firestore } from "../../../firebase/firebase";

export default async function postImage(user, image) {
  console.log("USER");
  console.log(user);
  console.log("IMAGE");
  console.log(image);

  const storageRef = storage.ref().child(`${user.uid}/posts/${image.name}`);
  await storageRef.put(image, {
    contentType: "image/jpeg",
  });
  const imageURL = await storageRef.getDownloadURL();

  const postRef = await firestore.collection("posts").add({
    author: {
      name: user.name,
      profileImage: user.profileImage,
      id: user.uid,
    },
    createdAt: "placeholder timestamp",
    image: imageURL,
    likeCount: 0,
    comments: [],
  });
}
