import { firestore } from "../../../firebase/firebase";
import generateProfileImage from "../../../utils/generateProfileImage/generateProfileImage";

async function loadUserProfile(user) {
  try {
    const docRef = firestore.collection("users").doc(user.uid);
    const doc = await docRef.get();
    if (doc.exists) {
      return;
    } else {
      const defaultUserName = user.email.split(/@(?=[^@]*$)/)[0];
      return await docRef.set({
        customProfileImage: false,
        fullName: user.displayName,
        name: defaultUserName,
        followers: [user.uid],
        following: [user.uid],
        followerCount: 0,
        followingCount: 0,
        postCount: 0,
        profileImage: generateProfileImage(user.displayName),
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export default loadUserProfile;
