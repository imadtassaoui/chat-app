import React from "react";
import "./messages.styles.scss";
const Messages = ({ currentUser, message }) => {
  const { text } = message;
  return (
    <div
      className={
        currentUser.id === message.sentBy
          ? "messagescontainer mainuser"
          : "messagescontainer"
      }
    >
      {currentUser ? (
        <div>
          <img src={currentUser.photoURL} alt='544' />
        </div>
      ) : null}
      <div className='message'>
        <div>{text}</div>
      </div>
    </div>
  );
};

export default Messages;
