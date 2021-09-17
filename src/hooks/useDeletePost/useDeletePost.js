import { functions } from "../../firebase/firebase";
import { useState, useEffect } from "react";

export default function useDeletePost(pid) {
  const [commenceDeletion, setCommenceDeletion] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);

  useEffect(() => {
    if (commenceDeletion) {
      (async () => {
        try {
          const deletePost = functions.httpsCallable("deletePost");
          console.log(`calling deletePost with pid: ${pid}`);
          await deletePost({ post: pid }).then(setDeleteStatus(true));
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [commenceDeletion, pid]);

  return { deleteStatus, setCommenceDeletion };
}
