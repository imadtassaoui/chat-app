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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();
    try {
      userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user profile", error.message);
    }
  }
  return userRef;
};
export const getUserprofilepic = async (userAuth) => {
  if (!userAuth) return;
  const { photoURL } = userAuth;
  return photoURL;
};

export const firestore = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
