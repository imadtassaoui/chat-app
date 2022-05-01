import React from "react";
import "./chatpage.styles.scss";
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
  setReciverID,
} from "../../redux/user/user.actions";
import MainChat from "../../components/main-chat/main-chat.component";
import Sidebar from "../../components/side-bar/side-bar.component";

import Inbox from "../../components/Inbox/inbox.component";

class Chatpage extends React.Component {
  componentDidMount() {
    const { currentUser, fetchUserFriendsAsync } = this.props;
    fetchUserFriendsAsync(currentUser);
  }

  render() {
    const {  reciverId } = this.props;
    return (
      <div className='chatpage-container'>
        <Sidebar />

        <Inbox />
        {reciverId ? <MainChat /> : null}
      </div>
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
});
export default connect(mapStateToProps, mapDispatchToProps)(Chatpage);
