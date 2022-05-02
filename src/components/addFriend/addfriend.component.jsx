import React, { useState } from "react";
import { connect } from "react-redux";
import { addFriendByEmail } from "../../firebase/firebase.util";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import Button from "@mui/material/Button";
import { Input } from "@mantine/core";
import { At } from "tabler-icons-react";
import "./addfriend.styles.scss";
const AddFriend = ({ currentUser }) => {
  const [firendToAdd, setFriendToAdd] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currentUser);
    await addFriendByEmail(currentUser, firendToAdd);
    setFriendToAdd("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className='Addfriend-containter'>
        <Input
          type='email'
          value={firendToAdd}
          icon={<At />}
          placeholder='Enter Email'
          onChange={(e) => {
            setFriendToAdd(e.target.value);
          }}
        />
        <Button variant='contained' size='small' color='inherit' type='submit'>
          Add Friend
        </Button>
      </form>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(AddFriend);
