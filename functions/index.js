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

exports.addUserToLikedBy = functions.firestore
  .document("hearts/{heartID}")
  .onCreate((snap) => {
    try {
      const { pid, uid } = snap.data();
      const postRef = admin.firestore().collection("posts").doc(pid);
      return postRef.update({
        likedBy: admin.firestore.FieldValue.arrayUnion(uid),
      });
    } catch (error) {
      console.log(error);
    }
  });

exports.removeUserFromLikedBy = functions.firestore
  .document("hearts/{heartID}")
  .onDelete((snap) => {
    try {
      const { pid, uid } = snap.data();
      const postRef = admin.firestore().collection("posts").doc(pid);
      return postRef.update({
        likedBy: admin.firestore.FieldValue.arrayRemove(uid),
      });
    } catch (error) {
      console.log(error);
    }
  });

// exports.updateFeeds = functions.firestore.document("posts/{postID}")
// .onWrite((change))
