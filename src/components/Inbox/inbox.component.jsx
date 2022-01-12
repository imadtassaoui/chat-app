import React from "react";
import MessegesPreview from "../../components/messages-preview/messeges-preview.component";
import "./inbox.styles.scss";
const Inbox = ({ users }) => {
  return (
    <div className='Inbox'>
      <input type='text' placeholder='search messages' />
      {users.map((user) => {
        user && <MessegesPreview key={user.id} users={user} />;
      })}
    </div>
  );
};
export default Inbox;
