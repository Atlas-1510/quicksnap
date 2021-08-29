import { firestore } from "../firebase/firebase";

function postToFirestore(doc, path, merge) {
  console.log(doc);
  if (!merge) {
    firestore.doc(path).add(doc);
  } else {
    firestore.doc(path).set(doc, {
      merge: true,
    });
  }
}

export default postToFirestore;
