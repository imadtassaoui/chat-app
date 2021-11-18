import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyB0xT1FhNJLM7TUuIW8-OgXWOOGZ_B6u_M",
  authDomain: "chat-app-d0772.firebaseapp.com",
  projectId: "chat-app-d0772",
  storageBucket: "chat-app-d0772.appspot.com",
  messagingSenderId: "887132591838",
  appId: "1:887132591838:web:88e9831a7975dea25b944f",
  measurementId: "G-BG15X4SF7D",
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
