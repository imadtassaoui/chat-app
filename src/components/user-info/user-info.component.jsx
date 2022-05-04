import React from "react";
import { useDispatch } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { setInboxHidden, setChatHidden } from "../../redux/user/user.actions";
import "./user-info.styles.scss";
const UserInfo = ({ currentUser }) => {
  const dispatch = useDispatch();
  return (
    <div className='user-info'>
      {currentUser ? (
        <div className='userinfo'>
          {window.innerWidth < 950 ? (
            <ArrowBackIcon
              className='backicon'
              onClick={() => {
                dispatch(setInboxHidden());
                dispatch(setChatHidden());
              }}
            />
          ) : null}

          <div>
            <img src={currentUser.photoURL} alt='544' />
          </div>
          <div>
            <span>{currentUser.displayName}</span>
          </div>
        </div>
      ) : (
        <div> loading ...</div>
      )}
    </div>
  );
};
export default UserInfo;
