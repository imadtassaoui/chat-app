import React, { useEffect } from "react";
import MessegesPreview from "../../components/messages-preview/messeges-preview.component";
import { Loader } from "@mantine/core";
import SimpleBadge from "../badge/badge.component";
import {
  selectCurrentUser,
  selectCurrentUserFriends,
  selectFetchingState,
  selectReciverId,
} from "../../redux/user/user.selectors";

import {
  fetchUserFriendsAsync,
  setCurrentUserFriends,
} from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import AccountMenu from "../account-menu/account-menu.component";
import "./inbox.styles.scss";

const Inbox = ({
  userFriends,
  currentUser,
  fetchingState,
  fetchUserFriendsAsync,
}) => {
  useEffect(() => {
    fetchUserFriendsAsync(currentUser);
  }, [fetchUserFriendsAsync, currentUser]);

  return (
    <div className='Inbox'>
      <div className='userinfo'>
        <div className='usertest'>
          <AccountMenu currentUser={currentUser} />
          <span>{currentUser.displayName}</span>
        </div>
        <div>
          <SimpleBadge />
        </div>
      </div>
      {fetchingState ? (
        userFriends.map((userFriend) => (
          <MessegesPreview key={userFriend.id} users={userFriend} />
        ))
      ) : (
        <div className='loading'>
          <Loader color='gray' />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userFriends: selectCurrentUserFriends,
  fetchingState: selectFetchingState,
  reciverId: selectReciverId,
});
const mapDispatchToProps = (dispatch) => ({
  fetchUserFriendsAsync: (currentUser) =>
    dispatch(fetchUserFriendsAsync(currentUser)),
  setCurrentUserFriends: (currentUser) =>
    dispatch(setCurrentUserFriends(currentUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
