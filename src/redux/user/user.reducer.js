import { userActiontypes } from "./user.types";
const INITIAL_STATE = {
  currentUser: null,
  userFriends: null,
  userMessages: null,
  reciverId: null,
  data: null,
  chatHidden: true,
  inboxHidden: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActiontypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userActiontypes.SET_CURRENT_USER_FRIENDS:
      return {
        ...state,
        userFriends: action.payload,
      };
    case userActiontypes.SET_CURRENT_USER_MESSAGES:
      return {
        ...state,
        userMessages: action.payload,
      };
    case userActiontypes.SET_CURRENT_RECIVER_ID:
      return {
        ...state,
        reciverId: action.payload,
      };
    case userActiontypes.SET_CHAT_HIDDEN:
      return {
        ...state,
        chatHidden: !state.chatHidden,
      };
    case userActiontypes.SET_INBOX_HIDDEN:
      return {
        ...state,
        inboxHidden: !state.inboxHidden,
      };
    case userActiontypes.SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
