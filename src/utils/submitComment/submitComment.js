import { firestore, FieldValue } from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";

const submitComment = async (id, uid, name, commentInput) => {
  const comment = {
    author: {
      id: uid,
      name: name,
    },
    content: commentInput,
    id: uuidv4(),
  };
  const postRef = firestore.collection("posts").doc(id);

  await postRef.update({
    comments: FieldValue.arrayUnion(comment),
  });
};

export default submitComment;
