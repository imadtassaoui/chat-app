import React from "react";
import { connect } from "react-redux";
import UserInfo from "../../components/user-info/user-info.component";
import Messages from "../../components/messages/messages.component";
import {
  selectCurrentUser,
  selectCurrentUserMessages,
  selectReciverId,
} from "../../redux/user/user.selectors";

import { createMessage } from "../../firebase/firebase.util";
import { createStructuredSelector } from "reselect";
import "./main-chat.styles.scss";
class MainChat extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
    };
  }

  handlechange = (e) => {
    const { value } = e.target;
    this.setState({ input: value });
  };

  sendMessage = (e) => {
    e.preventDefault();
    createMessage(
      this.props.currentUser,
      this.state.input,
      this.props.reciverId
    );
    this.setState({ input: "" });
  };
  render() {
    const { currentUser, userMessages, reciverId } = this.props;
    return (
      <div className='mainchat'>
        <div className='chatbox-container'>
          <UserInfo currentUser={reciverId} />
          <div className='chatbox'>
            {userMessages &&
              userMessages.map((mes) => (
                <Messages
                  reciverId={reciverId.id}
                  currentUser={currentUser}
                  message={mes}
                  key={mes.id}
                />
              ))}
          </div>
        </div>

        <form className='input' onSubmit={this.sendMessage}>
          <input
            placeholder='send a message'
            value={this.state.input}
            onChange={this.handlechange}
          />
          <button type='submit'>send</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userMessages: selectCurrentUserMessages,
  reciverId: selectReciverId,
});

export default connect(mapStateToProps)(MainChat);
