import React from "react";
import "./messages.styles.scss";
const Messages = ({ currentUser, message, reciverId }) => {
  const { text } = message;
  return (
    <div
      className={
        currentUser.id === message.sentBy
          ? "messagescontainer mainuser"
          : "messagescontainer"
      }
    >
      {currentUser.id === message.sentBy ? (
        <div>
          <img src={currentUser.photoURL} alt='544' />
        </div>
      ) : (
        <div>
          <img src={reciverId.photoURL} alt='544' />
        </div>
      )}
      <div className='message'>
        <div>{text}</div>
      </div>
    </div>
  );
};

export default Messages;
