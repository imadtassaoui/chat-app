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
export const createMessage = async (userAuth, textValue) => {
  if (!userAuth) return;
  const messageRef = firestore.collection("messages");
  const createdAt = new Date();
  const sentBy = userAuth.id;
  const text = textValue;
  try {
    messageRef.add({
      createdAt,
      sentBy,
      text,
    });
  } catch (error) {
    console.log("Failure to Send the message", error.message);
  }
  return messageRef;
};

export const addFriends = async (userAuth, friendId) => {
  const userRef = firestore.doc(`users/${userAuth.id}`);
  const snapShot = await userRef.get();
  if (snapShot.exists) {
    try {
      userRef.update({ friendId: [...userAuth.friendId, friendId] });
    } catch (error) {
      console.log("Failure to add the Friend", error.message);
    }
  }
};

export const convertMessageSnapsshotToMap = (messages) => {
  const transformedMessage = messages.docs.map((doc) => {
    const { text, sentBy, sentTo } = doc.data();
    return {
      id: doc.id,
      text,
      sentBy,
      sentTo,
    };
  });

  return transformedMessage;
};

export const getAllFriends = async (friendId) => {
  const userRef = firestore.doc(`users/${friendId}`);
  const snapShot = await userRef.get();
  if (snapShot.exists) {
    const { displayName, email, photoURL } = snapShot.data();

    return { displayName, email, photoURL };
  }
};
export const firestore = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
