import { functions } from "../../firebase/firebase";
import { useState, useEffect } from "react";

export default function useDeletePost(pid) {
  const [commenceDeletion, setCommenceDeletion] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);

  useEffect(() => {
    if (commenceDeletion) {
      (async () => {
        try {
          const backEndDelete = functions.httpsCallable("deletePost");
          await Promise.resolve(backEndDelete({ post: pid })).then(
            setDeleteStatus(true)
          );
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [commenceDeletion, pid]);

  return { deleteStatus, setCommenceDeletion };
}
