// import { firestore } from "../../firebase/firebase";
import { functions } from "../../firebase/firebase";

export default async function deletePost(pid) {
  try {
    console.log("delete post activated");
    const backEndDelete = functions.httpsCallable("deletePost");
    const result = await backEndDelete({ post: pid });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

// deletePost cloud function has been rewritten to be callable. Now call it from here in deletepost, providing the post ID.

// Check it all works as expected, then implement display logic to gray out a post while the return value of this function is pending.
