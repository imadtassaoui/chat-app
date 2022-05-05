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
    const friendId = [];
    try {
      userRef.set({
        id: userAuth.uid,
        displayName,
        email,
        photoURL,
        createdAt,
        friendId,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user profile", error.message);
    }
  }
  return userRef;
};
export const createMessage = async (userAuth, textValue, reciverId) => {
  if (!userAuth) return;
  const messageRef = firestore.collection("messages");
  const createdAt = new Date();
  const sentBy = userAuth.id;
  const text = textValue;
  const sentTo = reciverId.id;
  try {
    messageRef.add({
      createdAt,
      sentBy,
      text,
      sentTo,
    });
    console.log("created");
  } catch (error) {
    console.log("Failure to Send the message", error.message);
  }
  return messageRef;
};

export const addFriends = async (userAuth, friendId) => {
  const alreadyFriend = userAuth.friendId.includes(friendId);
  if (alreadyFriend) {
    alert("Already in your Friends list ");
    return;
  }
  const friendRef = firestore.doc(`users/${friendId}`);
  const userRef = firestore.doc(`users/${userAuth.id}`);
  const snapShot = await userRef.get();
  const friendToAdd = await friendRef.get().then((snapshot) => {
    return snapshot.data();
  });

  if (snapShot.exists && friendToAdd) {
    try {
      userRef.update({
        friendId: [...userAuth.friendId, friendId],
      });
      friendRef.update({
        friendId: [...friendToAdd.friendId, userAuth.id],
      });
    } catch (error) {
      console.log("Failure to add the Friend", error.message);
    }
  }
};
export const addFriendByEmail = async (userAuth, friendEmailToAdd) => {
  const userRef = firestore.collection("users");
  const emailarray = await userRef.get().then((snapshot) => {
    var result = "";
    snapshot.docs.forEach((doc) => {
      const { email } = doc.data();
      if (email === friendEmailToAdd) result = doc.id;
    });
    return result;
  });
  if (emailarray.length > 0) {
    addFriends(userAuth, emailarray);
  } else {
    alert("Please enter a valid email address");
  }
  return emailarray;
};

export const convertMessageSnapsshotToMap = (messages) => {
  const transformedMessage = messages.docs.map((doc) => {
    const { text, sentBy, sentTo, createdAt } = doc.data();
    return {
      id: doc.id,
      text,
      sentBy,
      sentTo,
      createdAt,
    };
  });

  return transformedMessage;
};

// export const getAllFriends = async (currentUser) => {
//   const friend = await currentUser.friendId.map((Id) => {
//     const userRef = firestore.doc(`users/${Id}`);
//     const nwfirnd = userRef.get().then((doc) => {
//       const { displayName, email, photoURL, createdAt, id } = doc.data();
//       return { displayName, email, photoURL, createdAt, id };
//     });
//     return nwfirnd;
//   });

//   return friend;
// };
export const firestore = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
