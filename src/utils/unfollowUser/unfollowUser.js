import { firestore, FieldValue } from "../../firebase/firebase";
const decrement = FieldValue.increment(-1);

const unfollowUser = async (userID, followerID) => {
  const userRef = firestore.collection("users").doc(userID);
  const targetRef = firestore.collection("users").doc(followerID);
  const promises = [];
  const followingUpdate = userRef.update({
    following: FieldValue.arrayRemove(followerID),
    followingCount: decrement,
  });
  promises.push(followingUpdate);
  const followersUpdate = targetRef.update({
    followers: FieldValue.arrayRemove(userID),
    followerCount: decrement,
  });
  promises.push(followersUpdate);
  await Promise.all(promises);
};

export default unfollowUser;
