import React from "react";
import { auth } from "../../firebase/firebase.util";
import { ReactComponent as FriendsIcon } from "../../assets/img/friends.svg";
import { ReactComponent as MessageBoxIcon } from "../../assets/img/message-box.svg";
import { ReactComponent as UserIcon } from "../../assets/img/user.svg";
import { ReactComponent as FilesIcon } from "../../assets/img/Files.svg";
import AccountMenu from "../account-menu/account-menu.component";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
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
        <UserIcon className='menu-pic' />
        <FriendsIcon className='menu-pic' />
        <MessageBoxIcon className='menu-pic' />
        <FilesIcon className='menu-pic' />
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
