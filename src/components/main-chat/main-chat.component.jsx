import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import UserInfo from "../../components/user-info/user-info.component";
import Messages from "../../components/messages/messages.component";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import {
  selectCurrentUser,
  selectCurrentUserMessages,
  selectReciverId,
  selectChatHiddenState,
} from "../../redux/user/user.selectors";
import { fetchUserMessagesAsync } from "../../redux/user/user.actions";
import { Input } from "@mantine/core";
import { createMessage } from "../../firebase/firebase.util";
import { Button } from "@mantine/core";
import { createStructuredSelector } from "reselect";
import "./main-chat.styles.scss";
const MainChat = ({
  currentUser,
  userMessages,
  reciverId,
  chatHidden,
  fetchUserMessagesAsync,
}) => {
  const [state, setState] = useState({ input: "" });
  const handlechange = (e) => {
    const { value } = e.target;
    setState({ input: value });
  };
  const Ref = useRef();
  const sendMessage = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await createMessage(currentUser, state.input, reciverId);
    setState({ input: "" });
    setTimeout(() => {
      Ref.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  return (
    <div
      className={`mainchat ${
        chatHidden && window.innerWidth < 560 ? "hidden" : ""
      }`}
    >
      <div className='chatbox-container'>
        <UserInfo currentUser={reciverId} />
        <div className='chatbox'>
          {userMessages?.currentUserMessages &&
            userMessages.currentUserMessages.map((mes) => (
              <Messages
                reciverId={reciverId}
                currentUser={currentUser}
                message={mes}
                key={mes.id}
              />
            ))}
          <div ref={Ref}></div>
        </div>
      </div>

      <form className='input-container' onSubmit={sendMessage}>
        <div className='input'>
          <Input
            style={{ width: "100%", margin: "3%" }}
            rightSection={<InsertEmoticonIcon style={{ color: "#ADB5BD" }} />}
            size='md'
            placeholder='send a message'
            value={state.input}
            onChange={handlechange}
          />
        </div>
        <div className='send-button'>
          <Button
            style={{ borderRadius: "50px", width: "60px", height: "40px" }}
            type='submit'
          >
            <SendIcon />
          </Button>
        </div>
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
const mapDispatchToProps = (dispatch) => ({
  fetchUserMessagesAsync: (currentUser, reciverId) =>
    dispatch(fetchUserMessagesAsync(currentUser, reciverId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MainChat);
