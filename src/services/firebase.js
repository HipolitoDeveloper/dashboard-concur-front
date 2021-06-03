import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
// import 'firebase/messaging';
import "firebase/analytics";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC4mM_36OWvOwvcoxsVgaYYiug8B3faEYM",
  authDomain: "sapconcur-6f23a.firebaseapp.com",
  databaseURL: "https://sapconcur-6f23a-default-rtdb.firebaseio.com",
  projectId: "sapconcur-6f23a",
  storageBucket: "sapconcur-6f23a.appspot.com",
  messagingSenderId: "391270002537",
  appId: "1:391270002537:web:f5d71ff0961d2e774e97f8",
  measurementId: "G-0SG3BEYRQH",
});

const auth = firebaseApp.auth();
const db = firebase.firestore();

const storage = firebase.storage();

// export const messaging = firebase.messaging();

const analytics = firebaseApp.analytics();

const PasswordUpdate = (password) => auth.currentUser.updatePassword(password);
const reAuth = firebase.auth.EmailAuthProvider;

export default firebaseApp;

export { auth, db, storage, analytics, PasswordUpdate, reAuth };
