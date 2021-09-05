const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

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
      return postRef.update({
        likedBy: admin.firestore.FieldValue.arrayRemove(uid),
        likeCount: admin.firestore.FieldValue.increment(-1),
      });
    } catch (error) {
      console.log(error);
    }
  });

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
