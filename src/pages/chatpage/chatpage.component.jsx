import axios from "axios";
import React from "react";
import "./chatpage.styles.scss";
import image from "./profile.jpg";
import MessegesPreview from "../../components/messages-preview/messeges-preview.component";
class Chatpage extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        this.setState({ users: res.data });
      })
      .then(() => console.log(this.state.users));
  }

  render() {
    const { users } = this.state;
    return (
      <div className='chatpage-container'>
        <div className='Sidebar-container'>
          <div className='userinfo'>
            <img src={image} alt='rr' />
            <span>User info</span>
          </div>
        </div>
        <div className='Inbox'>
          <input type='text' placeholder='search messages' />
          {users.map((user) => (
            <MessegesPreview users={user} />
          ))}
        </div>
        <div className='mainchat'>
          <div className='chatbox-container'>
            <div className='user-info'>test</div>
            <div className='chatbox'>test</div>
          </div>
          <div className='input'>
            <input />
            <button>send</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Chatpage;
