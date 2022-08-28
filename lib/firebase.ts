import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIPQ3RaTGynZc-JsKB-MNnApFupqWFC3s",
  authDomain: "kanban-353700.firebaseapp.com",
  projectId: "kanban-353700",
  storageBucket: "kanban-353700.appspot.com",
  messagingSenderId: "328135555686",
  appId: "1:328135555686:web:05aef9fdbdd9343e470ba7",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const githubAuthProvider = new firebase.auth.GithubAuthProvider();

export const AUTH_PROVIDERS = [
  googleAuthProvider,
  facebookAuthProvider,
  githubAuthProvider,
];

export const storage = firebase.storage();
export const firestore = firebase.firestore();
