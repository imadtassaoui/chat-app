import React from "react";
import "./messeges-preview.styles.scss";
import image from "./profile.jpg";
const MessegesPreview = ({ users }) => {
  return (
    <div className='usersmessages'>
      <img src={users.photoURL} alt='rr' />
      <div className='messagepreview'>
        <span>{users.displayName}</span>
        <span>{users.email}</span>
      </div>
    </div>
  );
};

export default MessegesPreview;
