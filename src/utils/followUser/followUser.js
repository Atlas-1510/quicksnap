import { firestore, FieldValue } from "../../firebase/firebase";
const increment = FieldValue.increment(1);

async function followUser(userID, followerID) {
  const userRef = firestore.collection("users").doc(userID);
  const targetRef = firestore.collection("users").doc(followerID);
  const promises = [];
  const followingUpdate = userRef.update({
    following: FieldValue.arrayUnion(followerID),
    followingCount: increment,
  });
  promises.push(followingUpdate);
  const followersUpdate = targetRef.update({
    followers: FieldValue.arrayUnion(userID),
    followerCount: increment,
  });
  promises.push(followersUpdate);
  await Promise.all(promises);
}

export default followUser;
