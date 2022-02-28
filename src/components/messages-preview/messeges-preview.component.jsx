import React from "react";
import "./messeges-preview.styles.scss";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  selectReciverId,
  selectCurrentUser,
} from "../../redux/user/user.selectors";
import {
  setReciverID,
  fetchUserMessagesAsync,
} from "../../redux/user/user.actions";
const MessegesPreview = ({
  users,
  setReciverID,
  currentUser,
  fetchUserMessagesAsync,
}) => {
  return (
    <div
      className='usersmessages'
      tabIndex='1'
      onClick={() => {
        setReciverID(users);
        fetchUserMessagesAsync(currentUser, users.id);
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
});
const mapDispatchToProps = (dispatch) => ({
  setReciverID: (id) => dispatch(setReciverID(id)),
  fetchUserMessagesAsync: (currentUser, reciverId) =>
    dispatch(fetchUserMessagesAsync(currentUser, reciverId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MessegesPreview);
