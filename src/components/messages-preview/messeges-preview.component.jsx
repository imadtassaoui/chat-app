import React from "react";
import "./messeges-preview.styles.scss";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  selectReciverId,
  selectCurrentUser,
  selectChatHiddenState,
} from "../../redux/user/user.selectors";
import {
  setReciverID,
  fetchUserMessagesAsync,
  setInboxHidden,
  setChatHidden,
} from "../../redux/user/user.actions";
const MessegesPreview = ({
  users,
  setReciverID,
  currentUser,
  fetchUserMessagesAsync,
  setInboxHidden,
  setChatHidden,
  chatHidden,
}) => {
  return (
    <div
      className='usersmessages'
      tabIndex='1'
      onClick={() => {
        setReciverID(users);
        fetchUserMessagesAsync(currentUser, users.id);
        if (window.innerWidth < 500) {
          setInboxHidden();
          if (chatHidden) {
            setChatHidden();
          }
        }
      }}
    >
      <img referrerPolicy='no-referrer' src={users.photoURL} alt='rr' />
      <div className='messagepreview'>
        <span>{users.displayName}</span>
        <span></span>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  reciverId: selectReciverId,
  currentUser: selectCurrentUser,
  chatHidden: selectChatHiddenState,
});
const mapDispatchToProps = (dispatch) => ({
  setReciverID: (id) => dispatch(setReciverID(id)),
  fetchUserMessagesAsync: (currentUser, reciverId) =>
    dispatch(fetchUserMessagesAsync(currentUser, reciverId)),
  setInboxHidden: (inboxHidden) => dispatch(setInboxHidden(inboxHidden)),
  setChatHidden: (chatHidden) => dispatch(setChatHidden(chatHidden)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MessegesPreview);
