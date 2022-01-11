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
class Chatpage extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    axios.get("https://reqres.in/api/users").then((res) => {
      this.setState({ users: res.data.data });
      console.log(this.state.users);
    });
  }

  render() {
    const { users } = this.state;
    const { currentUser } = this.props;
    return (
      <div className='chatpage-container'>
        <Sidebar />

        <Inbox users={users} />

        <div className='mainchat'>
          <div className='chatbox-container'>
            <UserInfo currentUser={currentUser} />
            <div className='chatbox'>
              <Messages currentUser={currentUser} />
              <Messages mainuser currentUser={currentUser} />
            </div>
          </div>
          <div className='input'>
            <input placeholder='send a message' />
            <button>send</button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Chatpage);
