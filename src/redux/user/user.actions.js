import { userActiontypes } from "./user.types";
import {
  firestore,
  convertMessageSnapsshotToMap,
} from "../../firebase/firebase.util";
import { OnlyCurrentUserMessages } from "./user.utils";
export const setCurrentUser = (currentUser) => ({
  type: userActiontypes.SET_CURRENT_USER,
  payload: currentUser,
});
export const setCurrentUserFriends = (userFriends) => ({
  type: userActiontypes.SET_CURRENT_USER_FRIENDS,
  payload: userFriends,
});
export const setCurrentUserMessages = (userMessages) => ({
  type: userActiontypes.SET_CURRENT_USER_MESSAGES,
  payload: userMessages,
});
export const setReciverID = (reciverId) => ({
  type: userActiontypes.SET_CURRENT_RECIVER_ID,
  payload: reciverId,
});
export const setChatHidden = () => ({
  type: userActiontypes.SET_CHAT_HIDDEN,
});
export const setInboxHidden = () => ({
  type: userActiontypes.SET_INBOX_HIDDEN,
});
export const fetchUserMessagesAsync = (currentUser, reciverId) => {
  return (dispatch) => {
    const messageRef = firestore.collection("messages").orderBy("createdAt");

    messageRef.onSnapshot((snapshot) => {
      const data = convertMessageSnapsshotToMap(snapshot);

      const currentUserMessages = OnlyCurrentUserMessages(
        data,
        currentUser,
        reciverId
      );
      dispatch(setCurrentUserMessages(currentUserMessages));
    });
  };
};

export const fetchUserFriendsAsync = (currentUser) => {
  if (!currentUser) return;
  return async (dispatch) => {
    const friends = await fetchdata(currentUser);
    dispatch(setCurrentUserFriends(friends));
  };
};
const fetchdata = async (currentUser) => {
  if (currentUser) {
    const friends = await currentUser.friendId.map(async (Id) => {
      const userRef = firestore.doc(`users/${Id}`);
      const doc = await userRef.get().then((doc) => {
        const { displayName, email, photoURL, createdAt, id } = doc.data();
        return { displayName, email, photoURL, createdAt, id };
      });
      return doc;
    });
    return Promise.all(friends);
  }
};
