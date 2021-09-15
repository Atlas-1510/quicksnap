const algoliasearch = require("algoliasearch");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const env = functions.config();

const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex("quicksnap_users");

// *************************** Algolia ********************************

exports.indexUser = functions
  .region("australia-southeast1")
  .firestore.document("users/{userID}")
  .onCreate((snap, context) => {
    const data = snap.data();
    const objectID = snap.id;

    return index.saveObject({
      name: data.name,
      fullName: data.fullName,
      profileImage: data.profileImage,
      id: objectID,
      objectID,
    });
  });

exports.unindexUser = functions
  .region("australia-southeast1")
  .firestore.document("users/{userID}")
  .onDelete((snap) => {
    const objectID = snap.id;

    return index.deleteObject(objectID);
  });

exports.updateUserIndex = functions
  .region("australia-southeast1")
  .firestore.document("users/{userID}")
  .onUpdate((change, context) => {
    const newValue = change.after.data();
    const objectID = context.params.userID;

    return index.saveObject({
      name: newValue.name,
      fullName: newValue.fullName,
      profileImage: newValue.profileImage,
      id: objectID,
      objectID,
    });
  });

// *************************** Liking posts ********************************

exports.addUserToLikedBy = functions
  .region("australia-southeast1")
  .firestore.document("hearts/{heartID}")
  .onCreate((snap) => {
    try {
      const { pid, uid } = snap.data();
      const postRef = admin.firestore().collection("posts").doc(pid);
      return postRef.update({
        likedBy: admin.firestore.FieldValue.arrayUnion(uid),
        likeCount: admin.firestore.FieldValue.increment(1),
      });
    } catch (error) {
      console.log(error);
    }
  });

exports.removeUserFromLikedBy = functions
  .region("australia-southeast1")
  .firestore.document("hearts/{heartID}")
  .onDelete((snap) => {
    try {
      const { pid, uid } = snap.data();
      const postRef = admin.firestore().collection("posts").doc(pid);
      postRef.get().then((snap) => {
        if (snap.exists) {
          return postRef.update({
            likedBy: admin.firestore.FieldValue.arrayRemove(uid),
            likeCount: admin.firestore.FieldValue.increment(-1),
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

// *************************** User feed management ********************************

exports.updateFeeds = functions
  .region("australia-southeast1")
  .firestore.document("posts/{postID}")
  .onCreate(async (snap, context) => {
    try {
      const authorID = snap.data().author.id;
      const user = await admin
        .firestore()
        .collection("users")
        .doc(authorID)
        .get()
        .then((result) => {
          return result.data();
        });
      const followerIDs = user.followers;
      const promises = [];
      followerIDs.forEach((id) => {
        const feedRef = admin
          .firestore()
          .collection("feeds")
          .doc(id)
          .collection("feedItems");
        const feedItemPromise = feedRef.doc(context.params.postID).set({
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
        promises.push(feedItemPromise);
      });
      return Promise.all(promises);
    } catch (error) {
      console.log(error);
    }
  });

// *************************** Deleting posts ********************************

exports.deletePost = functions
  .region("australia-southeast1")
  .https.onCall(async (data, context) => {
    return await deletePostModule(data.post);
  });

// This module has been abstracted out of the deletePost cloud fn so it can be
// referenced within the deleteAccount cloud fn
async function deletePostModule(postID) {
  const postRef = admin.firestore().collection("posts").doc(postID);
  const postDoc = await postRef.get();
  const post = { ...postDoc.data(), id: postDoc.id };
  return await (async () => {
    const authorID = post.author.id;
    const authorDocRef = await admin
      .firestore()
      .collection("users")
      .doc(authorID)
      .get();
    const authorDoc = authorDocRef.data();
    const { followers } = authorDoc;
    // delete post from feeds
    try {
      const promises = [];
      followers.forEach((follower) => {
        const feedItemRef = admin
          .firestore()
          .collection("feeds")
          .doc(follower)
          .collection("feedItems")
          .doc(post.id)
          .delete();
        promises.push(feedItemRef);
      });
      await Promise.all(promises);
    } catch (err) {
      console.log(err);
      console.log("error deleting posts from feeds documents");
      return "error deleting posts from feeds documents";
    }
    // delete image from storage
    try {
      const bucket = admin.storage().bucket();
      const path = `${post.author.id}/posts/${post.fileName}`;
      bucket.file(path).delete();
    } catch (err) {
      console.log(err);
      return "error deleting image from storage";
    }
    // delete related heart documents
    try {
      const { likedBy } = post;
      const promises = [];
      likedBy.forEach((userID) => {
        // document in hearts root collection
        const heartRef = admin
          .firestore()
          .collection("hearts")
          .doc(`${userID}_${post.id}`)
          .delete();
        promises.push(heartRef);
        // document in liked subcollection of user document
        const likedRef = admin
          .firestore()
          .collection("users")
          .doc(userID)
          .collection("liked")
          .doc(`${userID}_${post.id}`)
          .delete();
        promises.push(likedRef);
      });
      await Promise.all(promises);
    } catch (err) {
      console.log(err);
      return "error deleting heart documents";
    }
    // delete related save documents
    try {
      admin
        .firestore()
        .collection("saves")
        .where("pid", "==", post.id)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            doc.ref.delete();
          });
        });
    } catch (err) {
      console.log(err);
      console.log("error deleting save documents");
      return "error deleting save documents";
    }
    // delete related save documents on user subcollections
    try {
      const promises = [];
      followers.forEach((follower) => {
        const feedItemRef = admin
          .firestore()
          .collection("users")
          .doc(follower)
          .collection("saves")
          .doc(`${follower}_${post.id}`)
          .delete();
        promises.push(feedItemRef);
      });
      await Promise.all(promises);
    } catch (err) {
      console.log(err);
      console.log("error deleting save documents in subcollection");
      return "error deleting save documents in subcollection";
    }
    // delete post
    try {
      postRef.delete();
    } catch (err) {
      console.log(err);
      return "error deleting post";
    }
    return 0;
  })();
}

// *************************** Deleting accounts ********************************

exports.deleteAccount = functions
  .region("australia-southeast1")
  .auth.user()
  .onDelete(async (user) => {
    const uid = user.uid;
    const userDocRef = admin.firestore().collection("users").doc(uid);
    const packedUserDoc = await userDocRef.get();
    const userDoc = packedUserDoc.data();
    // For each user post, delete that post
    try {
      const postPromises = [];
      admin
        .firestore()
        .collection("posts")
        .where(`author.id`, "==", uid)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const promise = deletePostModule(doc.id);
            postPromises.push(promise);
          });
        });
      await Promise.all(postPromises);
    } catch (err) {
      console.log("Error deleting posts");
      console.log(err);
    }
    // If a custom profile image, delete that from storage
    if (userDoc.customProfileImage) {
      try {
        const bucket = admin.storage().bucket();
        const path = `${uid}/profileImages`;
        bucket.file(path).delete();
      } catch (err) {
        console.log("Error deleting profile image");
        console.log(err);
      }
    }
    // Delete userID from each users following array
    try {
      const userPromises = [];
      admin
        .firestore()
        .collection("users")
        .where("following", "array-contains", uid)
        .get()
        .then((snapshots) => {
          snapshots.forEach((snapshot) => {
            const promise = snapshot.ref.update({
              following: admin.firestore.FieldValue.arrayRemove(uid),
            });
            userPromises.push(promise);
          });
        });
      await Promise.all(userPromises);
    } catch (err) {
      console.log("Error updating follower arrays");
      console.log(err);
    }
    // Delete Feed document
    admin
      .firestore()
      .collection("feeds")
      .doc(uid)
      .get()
      .then((snap) => {
        if (snap.exists) {
          snap.ref.delete();
        }
      });

    // Delete the user doc
    try {
      await userDocRef.delete();
    } catch (err) {
      console.log("Error deleting user document");
      console.log(err);
    }
  });
