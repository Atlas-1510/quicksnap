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
      return postRef.update({
        likedBy: admin.firestore.FieldValue.arrayRemove(uid),
        likeCount: admin.firestore.FieldValue.increment(-1),
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
