import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyA_zqyAb5wbrUILilRHJcByyLFqrqsOyvg",
  authDomain: "quicksnap-58e9a.firebaseapp.com",
  projectId: "quicksnap-58e9a",
  storageBucket: "quicksnap-58e9a.appspot.com",
  messagingSenderId: "1053191696710",
  appId: "1:1053191696710:web:517e270876599b24587547",
  measurementId: "G-3LCVBTMFYY",
};

const fireApp = firebase.initializeApp(firebaseConfig);
// firebase.analytics(); TODO: Re-enable analytics

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const FieldValue = firebase.firestore.FieldValue;

const functions = fireApp.functions("australia-southeast1");

export { auth, firestore, storage, timestamp, FieldValue, functions };
