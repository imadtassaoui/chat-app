import axios from "axios";
import React from "react";
import "./chatpage.styles.scss";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Sidebar from "../../components/side-bar/side-bar.component";
import Messages from "../../components/messages/messages.component";
import UserInfo from "../../components/user-info/user-info.component";
import Inbox from "../../components/Inbox/inbox.component";
import {
  firestore,
  createMessage,
  convertMessageSnapsshotToMap,
  addFriends,
  getAllFriends,
} from "../../firebase/firebase.util";
import { OnlyCurrentUserMessages } from "../../redux/user/user.utils";

class Chatpage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      users: [],
      input: "",
      message: [],
      friends: [],
    };
  }
  componentDidMount() {
    axios.get("https://reqres.in/api/users").then((res) => {
      this.setState({ users: res.data.data });
      console.log(this.props.currentUser);
    });
    const messageRef = firestore.collection("messages").orderBy("createdAt");
    messageRef.onSnapshot(async (snapshot) => {
      const data = convertMessageSnapsshotToMap(snapshot);
      const currentUserMessages = OnlyCurrentUserMessages(
        data,
        this.props.currentUser
      );

      this.setState({
        message: currentUserMessages,
      });
    });
    this.props.currentUser.friendId.map(async (id) => {
      const newFriend = await getAllFriends(id);
      this.setState({ friends: [...this.state.friends, newFriend] });
    });

    //addFriends(
    //this.props.currentUser,

    //"VkFc6ji4FdfUuQ8hv5a5R7YC0jy2"
    //);
  }

  handlechange = (e) => {
    const { value } = e.target;
    this.setState({ input: value });
  };

  sendMessage = (e) => {
    e.preventDefault();
    createMessage(this.props.currentUser, this.state.input);
    this.setState({ input: "" });
  };
  render() {
    const { users, message } = this.state;
    const { currentUser } = this.props;
    console.log(this.state.friends);
    return (
      <div className='chatpage-container'>
        <Sidebar />

        <Inbox users={this.state.friends} />

        <div className='mainchat'>
          <div className='chatbox-container'>
            <UserInfo currentUser={currentUser} />
            <div className='chatbox'>
              {message &&
                message.map((mes) => (
                  <Messages
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
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Chatpage);
