import React from "react";
import MessegesPreview from "../../components/messages-preview/messeges-preview.component";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import {
  selectCurrentUser,
  selectCurrentUserFriends,
  selectFetchingState,
} from "../../redux/user/user.selectors";
import { addFriendByEmail } from "../../firebase/firebase.util";
import { fetchUserFriendsAsync } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useState } from "react";
import "./inbox.styles.scss";
import Button from "@mui/material/Button";
const Inbox = ({ userFriends, currentUser, fetchingState }) => {
  const [firendToAdd, setFriendToAdd] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addFriendByEmail(currentUser, firendToAdd);

    setFriendToAdd("");
  };
  return (
    <div className='Inbox'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={firendToAdd}
          placeholder='search messages'
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
        <div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userFriends: selectCurrentUserFriends,
  fetchingState: selectFetchingState,
});
const mapDispatchToProps = (dispatch) => ({
  fetchUserFriendsAsync: (currentUser) =>
    dispatch(fetchUserFriendsAsync(currentUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
