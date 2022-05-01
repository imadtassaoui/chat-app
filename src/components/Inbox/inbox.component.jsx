import React, { useEffect } from "react";
import MessegesPreview from "../../components/messages-preview/messeges-preview.component";
import { Loader } from "@mantine/core";
import {
  selectCurrentUser,
  selectCurrentUserFriends,
  selectFetchingState,
  selectReciverId,
} from "../../redux/user/user.selectors";
import { addFriendByEmail } from "../../firebase/firebase.util";
import {
  fetchUserFriendsAsync,
  setCurrentUserFriends,
} from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useState } from "react";
import "./inbox.styles.scss";
import Button from "@mui/material/Button";

const Inbox = ({
  userFriends,
  currentUser,
  fetchingState,
  fetchUserFriendsAsync,
}) => {
  const [firendToAdd, setFriendToAdd] = useState("");
  useEffect(() => {
    fetchUserFriendsAsync(currentUser);
  }, [fetchUserFriendsAsync, currentUser]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currentUser);
    await addFriendByEmail(currentUser, firendToAdd);
    setFriendToAdd("");
  };
  return (
    <div className='Inbox'>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          value={firendToAdd}
          placeholder='enter email adress'
          onChange={(e) => {
            setFriendToAdd(e.target.value);
          }}
        />
        <Button variant='contained' size='small' color='inherit' type='submit'>
          Add Friend
        </Button>
      </form>
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
