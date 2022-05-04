import React, { useState } from "react";
import { connect } from "react-redux";
import UserInfo from "../../components/user-info/user-info.component";
import Messages from "../../components/messages/messages.component";
import {
  selectCurrentUser,
  selectCurrentUserMessages,
  selectReciverId,
  selectChatHiddenState,
} from "../../redux/user/user.selectors";

import { createMessage } from "../../firebase/firebase.util";

import { createStructuredSelector } from "reselect";
import "./main-chat.styles.scss";
const MainChat = ({ currentUser, userMessages, reciverId, chatHidden }) => {
  const [state, setState] = useState({ input: "" });
  const handlechange = (e) => {
    const { value } = e.target;
    setState({ input: value });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    createMessage(currentUser, state.input, reciverId);
    console.log(reciverId);
    setState({ input: "" });
  };

  return (
    <div
      className={`mainchat ${
        chatHidden && window.innerWidth < 500 ? "hidden" : ""
      }`}
    >
      <div className='chatbox-container'>
        <UserInfo currentUser={reciverId} />
        <div className='chatbox'>
          {userMessages &&
            userMessages.map((mes) => (
              <Messages
                reciverId={reciverId}
                currentUser={currentUser}
                message={mes}
                key={mes.id}
              />
            ))}
        </div>
      </div>

      <form className='input' onSubmit={sendMessage}>
        <input
          placeholder='send a message'
          value={state.input}
          onChange={handlechange}
        />
        <button type='submit'>send</button>
      </form>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userMessages: selectCurrentUserMessages,
  reciverId: selectReciverId,
  chatHidden: selectChatHiddenState,
});

export default connect(mapStateToProps)(MainChat);
