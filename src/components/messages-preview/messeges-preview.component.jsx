import React, { useEffect, useState } from "react";
import "./messeges-preview.styles.scss";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { latestRecivedMessages } from "../../redux/user/user.utils";
import moment from "moment";
import {
  selectReciverId,
  selectCurrentUser,
  selectChatHiddenState,
  selectCurrentUserMessages,
  selectData,
} from "../../redux/user/user.selectors";
import {
  setReciverID,
  fetchUserMessagesAsync,
  setInboxHidden,
  setChatHidden,
} from "../../redux/user/user.actions";
const MessegesPreview = ({
  users,
  reciverId,
  setReciverID,
  currentUser,
  fetchUserMessagesAsync,
  setInboxHidden,
  setChatHidden,
  chatHidden,
  data,
}) => {
  const [lastMessage, setLastMessage] = useState(
    latestRecivedMessages(data, users.id, currentUser)
  );
  const [clicked, setClicked] = useState("false");
  const [lastMessageDate, setLastMessageDate] = useState(null);
  let unsubscribe;
  useEffect(() => {
    setLastMessage(latestRecivedMessages(data, users.id, currentUser));
    if (lastMessage) {
      if (
        typeof lastMessage.createdAt === "object" &&
        lastMessage.createdAt !== null &&
        "toDate" in lastMessage.createdAt
      ) {
        if (
          moment(lastMessage.createdAt.toDate())
            .subtract(0, "days")
            .calendar()
            .includes("Today")
        ) {
          setLastMessageDate(
            moment(lastMessage.createdAt.toDate()).format("LT")
          );
        } else if (
          moment(lastMessage.createdAt.toDate())
            .calendar()
            .includes("Yesterday")
        ) {
          setLastMessageDate("Yesterday");
        } else {
          setLastMessageDate(
            moment(lastMessage.createdAt.toDate()).format("L")
          );
        }
      }
    }
  }, [data, currentUser, lastMessage, reciverId]);

  return (
    <div
      className='usersmessages'
      tabIndex='1'
      onClick={(e) => {
        e.stopPropagation();
        setReciverID(users);
        if (window.innerWidth < 500) {
          setInboxHidden();
          if (chatHidden) {
            setChatHidden();
          }
        }
      }}
    >
      <img referrerPolicy='no-referrer' src={users.photoURL} alt='rr' />
      <div className='messagepreview'>
        <div className='username-date'>
          <div className='username'>
            <h5>{users.displayName}</h5>
          </div>
          <div className='date'>
            <span>{lastMessageDate ? lastMessageDate : null}</span>
          </div>
        </div>
        {lastMessage ? (
          <div className='message-container'>
            <div className='message'>
              <span>{lastMessage.text}</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  reciverId: selectReciverId,
  currentUser: selectCurrentUser,
  chatHidden: selectChatHiddenState,
  userMessages: selectCurrentUserMessages,
  data: selectData,
});
const mapDispatchToProps = (dispatch) => ({
  setReciverID: (id) => dispatch(setReciverID(id)),
  fetchUserMessagesAsync: (currentUser, reciverId) =>
    dispatch(fetchUserMessagesAsync(currentUser, reciverId)),
  setInboxHidden: (inboxHidden) => dispatch(setInboxHidden(inboxHidden)),
  setChatHidden: (chatHidden) => dispatch(setChatHidden(chatHidden)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MessegesPreview);
