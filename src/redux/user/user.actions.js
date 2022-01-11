import { userActiontypes } from "./user.types";

export const setCurrentUser = (user) => ({
  type: userActiontypes.SET_CURRENT_USER,
  payload: user,
});
