import { createSelector } from "reselect";

const userSelector = (state) => state.user;

export const selectCurrentUser = createSelector(
  [userSelector],
  (user) => user.currentUser
);
export const selectCurrentUserFriends = createSelector(
  [userSelector],
  (user) => user.userFriends
);
export const selectCurrentUserMessages = createSelector(
  [userSelector],
  (user) => user.userMessages
);
export const selectReciverId = createSelector(
  [userSelector],
  (user) => user.reciverId
);
export const selectFetchingState = createSelector(
  [userSelector],
  (user) => !!user.userFriends
);
