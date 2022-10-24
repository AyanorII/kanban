import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_EzWKGA4o7uiUsHPaONjLWcy4a3qU6OA",
  authDomain: "kanban-364802.firebaseapp.com",
  projectId: "kanban-364802",
  storageBucket: "kanban-364802.appspot.com",
  messagingSenderId: "31607079094",
  appId: "1:31607079094:web:bfcf28e88fb745b9556617",
  measurementId: "G-W6E7CHQVY9",
};

// Initialize Firebase

if (!firebase.apps.length) {
  const app = firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
