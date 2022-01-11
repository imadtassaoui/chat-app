import React from "react";
import "./messages.styles.scss";
const Messages = ({ currentUser, mainuser }) => {
  return (
    <div
      className={mainuser ? "messagescontainer mainuser" : "messagescontainer"}
    >
      {currentUser ? (
        <div>
          <img src={currentUser.photoURL} alt='544' />
        </div>
      ) : null}
      <div className='message'>
        <div>message</div>
      </div>
    </div>
  );
};

export default Messages;
