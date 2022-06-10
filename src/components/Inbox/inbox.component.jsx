import React, { useEffect } from "react";
import MessegesPreview from "../../components/messages-preview/messeges-preview.component";
import { Loader } from "@mantine/core";
import SimpleBadge from "../badge/badge.component";
import { Input } from "@mantine/core";
import { At } from "tabler-icons-react";
import {
  selectCurrentUser,
  selectCurrentUserFriends,
  selectFetchingState,
  selectReciverId,
  selectInboxHiddenState,
} from "../../redux/user/user.selectors";

import {
  fetchUserFriendsAsync,
  setCurrentUserFriends,
  setInboxHidden,
} from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import AccountMenu from "../account-menu/account-menu.component";
import "./inbox.styles.scss";
const Inbox = ({
  userFriends,
  currentUser,
  inboxHidden,
  fetchingState,
  fetchUserFriendsAsync,
}) => {
  useEffect(() => {
    fetchUserFriendsAsync(currentUser);
  }, [fetchUserFriendsAsync, currentUser]);

  return (
    <div
      className={`Inbox ${
        inboxHidden && window.innerWidth < 560 ? "hidden" : ""
      }`}
    >
      <div className='userinfo'>
        <div className='usertest'>
          <AccountMenu currentUser={currentUser} />
          <span>{currentUser.displayName}</span>
        </div>
        <div>
          <SimpleBadge />
        </div>
      </div>
      <div className='search-friend'>
        <Input
          style={{ width: "90%" }}
          icon={<At />}
          variant='filled'
          placeholder='Searsh Friends'
          radius='xl'
        />
      </div>
      {fetchingState ? (
        userFriends.map((userFriend) => (
          <MessegesPreview key={userFriend.id} users={userFriend} />
        ))
      ) : (
        <div className='loading'>
          <Loader />
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
  inboxHidden: selectInboxHiddenState,
});
const mapDispatchToProps = (dispatch) => ({
  fetchUserFriendsAsync: (currentUser) =>
    dispatch(fetchUserFriendsAsync(currentUser)),
  setCurrentUserFriends: (currentUser) =>
    dispatch(setCurrentUserFriends(currentUser)),
  setInboxHidden: (chatHidden) => dispatch(setInboxHidden(chatHidden)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
