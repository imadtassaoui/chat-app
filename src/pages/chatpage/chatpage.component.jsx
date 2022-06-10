import React, { useEffect } from "react";
import "./chatpage.styles.scss";
import { motion } from "framer-motion";
import {
  selectCurrentUser,
  selectCurrentUserMessages,
  selectReciverId,
  selectCurrentUserFriends,
} from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  fetchUserFriendsAsync,
  fetchUserMessagesAsync,
  setReciverID,
  setChatHidden,
} from "../../redux/user/user.actions";
import MainChat from "../../components/main-chat/main-chat.component";

import Inbox from "../../components/Inbox/inbox.component";

const Chatpage = ({
  reciverId,
  currentUser,
  fetchUserFriendsAsync,
  fetchUserMessagesAsync,
}) => {
  useEffect(() => {
    fetchUserMessagesAsync(currentUser);
  }, []);

  return (
    <motion.div
      exit={{
        opacity: 0.2,
        transition: { duration: 0.08, ease: "easeInOut" },
      }}
      initial={{ opacity: 0.5 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.08, ease: "easeInOut" },
      }}
      className='chatpage-container'
    >
      <Inbox />
      {reciverId ? <MainChat /> : null}
    </motion.div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userMessages: selectCurrentUserMessages,
  reciverId: selectReciverId,
  userFriends: selectCurrentUserFriends,
});
const mapDispatchToProps = (dispatch) => ({
  setReciverID: (id) => dispatch(setReciverID(id)),
  fetchUserFriendsAsync: (currentUser) =>
    dispatch(fetchUserFriendsAsync(currentUser)),
  fetchUserMessagesAsync: (currentUser, reciverId) =>
    dispatch(fetchUserMessagesAsync(currentUser, reciverId)),
  setChatHidden: (chatHidden) => dispatch(setChatHidden(chatHidden)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Chatpage);
