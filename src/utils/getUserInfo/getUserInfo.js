import { firestore } from "../../firebase/firebase";

export default async function getUserInfo(id) {
  const userRef = firestore.collection("users").doc(id);
  const userDoc = await userRef.get();
  const user = {
    ...userDoc.data(),
    id: userDoc.id,
  };
  return user;
}
