import { firestore } from "../../firebase/firebase";

const updatePost = async (id) => {
  const postRef = firestore.collection("posts").doc(id);
  const post = await postRef.get();
  return {
    ...post.data(),
    id: post.id,
  };
};

export default updatePost;
