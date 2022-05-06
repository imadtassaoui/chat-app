import React, { Component } from "react";
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
} from "../../redux/user/user.actions";
import MainChat from "../../components/main-chat/main-chat.component";

import Inbox from "../../components/Inbox/inbox.component";

class Chatpage extends Component {
  componentDidMount() {
    const { currentUser, fetchUserFriendsAsync, fetchUserMessagesAsync } =
      this.props;
    fetchUserFriendsAsync(currentUser);
    fetchUserMessagesAsync(currentUser);
  }
  render() {
    const { reciverId } = this.props;
    return (
      <motion.div
        exit={{
          opacity: 0.2,
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        initial={{ opacity: 0.5 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        className='chatpage-container'
      >
        <Inbox />
        {reciverId ? <MainChat /> : null}
      </motion.div>
    );
  }
}
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
});
export default connect(mapStateToProps, mapDispatchToProps)(Chatpage);
