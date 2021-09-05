import { firestore } from "../../firebase/firebase";

async function getLikedByInfo(pid) {
  const postRef = firestore.collection("posts").doc(pid);
  const post = await postRef.get().then((result) => {
    return result.data();
  });
  const likedBy = post.likedBy;
  const userInfoPromises = [];
  likedBy.forEach((uid) => {
    const promise = firestore.collection("users").doc(uid).get();
    userInfoPromises.push(promise);
  });

  const userInfo = await Promise.all(userInfoPromises).then((results) =>
    results.map((result) => ({
      ...result.data(),
      id: result.id,
    }))
  );
  const likedByInfo = userInfo.map((user) => {
    return {
      id: user.id,
      name: user.name,
      fullName: user.fullName,
      profileImage: user.profileImage,
      followers: user.followers,
    };
  });
  return likedByInfo;
}

export default getLikedByInfo;
