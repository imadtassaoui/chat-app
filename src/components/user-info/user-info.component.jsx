import React from "react";
import "./user-info.styles.scss";
const UserInfo = ({ currentUser }) => {
  return (
    <div className='user-info'>
      {currentUser ? (
        <div className='userinfo'>
          <div>
            <span>{currentUser.displayName}</span>
          </div>
          <div>
            <img src={currentUser.photoURL} alt='544' />
          </div>
        </div>
      ) : (
        <div> loading ...</div>
      )}
    </div>
  );
};
export default UserInfo;
