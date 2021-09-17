import { firestore, FieldValue } from "../../firebase/firebase";
const increment = FieldValue.increment(1);

// TODO: Consider replacing the follower update below with a cloud function that is triggered when a users following array is updated
// this might be better for security, as it would be difficult to control user access to edit the followers of other users via security rules

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
