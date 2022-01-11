import React from "react";
import { auth } from "../../firebase/firebase.util";
import { ReactComponent as FriendsIcon } from "../../assets/img/friends.svg";
import { ReactComponent as MessageBoxIcon } from "../../assets/img/message-box.svg";
import { ReactComponent as UserIcon } from "../../assets/img/user.svg";
import { ReactComponent as FilesIcon } from "../../assets/img/Files.svg";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./side-bar.styles.scss";
const Sidebar = ({ currentUser }) => {
  return (
    <div className='Sidebar-container'>
      {currentUser ? (
        <div className='userinfo'>
          <div>
            <img
              referrerPolicy='no-referrer'
              src={currentUser.photoURL}
              alt='544'
            />
          </div>
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
        <div className='signout' onClick={() => auth.signOut()}>
          Sign Out
        </div>
      ) : null}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Sidebar);
