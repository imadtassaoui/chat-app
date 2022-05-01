import React from "react";
import { auth } from "../../firebase/firebase.util";
import SimpleBadge from "../badge/badge.component";
import AccountMenu from "../account-menu/account-menu.component";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import {
  selectCurrentUser,
  selectCurrentUserMessages,
} from "../../redux/user/user.selectors";
import {
  setReciverID,
  setCurrentUserMessages,
  setCurrentUserFriends,
} from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./side-bar.styles.scss";
const Sidebar = ({
  currentUser,
  setReciverID,
  setCurrentUserMessages,
  setCurrentUserFriends,
}) => {
  return (
    <div className='Sidebar-container'>
      {currentUser ? (
        <div className='userinfo'>
          <AccountMenu currentUser={currentUser} />
          <div>
            <span>{currentUser.displayName}</span>
          </div>
        </div>
      ) : null}
      <div className='menu'>
        <SimpleBadge />
      </div>

      {currentUser ? (
        <Button
          color='inherit'
          className='signout'
          endIcon={<LogoutIcon />}
          variant='contained'
          onClick={() => {
            setReciverID(null);
            setCurrentUserMessages(null);
            setCurrentUserFriends(null);
            auth.signOut();
          }}
        >
          {" "}
          Log Out
        </Button>
      ) : null}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userMessages: selectCurrentUserMessages,
});
const mapDispatchToProps = (dispatch) => ({
  setReciverID: (id) => dispatch(setReciverID(id)),
  setCurrentUserMessages: (userMessages) =>
    dispatch(setCurrentUserMessages(userMessages)),
  setCurrentUserFriends: (currentUser) =>
    dispatch(setCurrentUserFriends(currentUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
