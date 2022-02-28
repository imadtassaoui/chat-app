import SignInUpPage from "./pages/Sign-In-Up-page/sign-In-Up.component";
import "./App.scss";
import { auth, createUserProfileDocument } from "./firebase/firebase.util";
import React, { Component } from "react";
import Homepage from "./pages/homepage/homepage";
import Chatpage from "./pages/chatpage/chatpage.component";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  setCurrentUser,
  fetchUserFriendsAsync,
  setCurrentUserFriends,
} from "./redux/user/user.actions";
import {
  selectCurrentUser,
  selectCurrentUserFriends,
} from "./redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

class App extends Component {
  //multiFactor.user.displayName
  unSubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser, fetchUserFriendsAsync, currentUser } = this.props;
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createUserProfileDocument(user);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(user);
      }
    });
  }
  componentWillUnmount() {
    this.unSubscribeFromAuth();
    setCurrentUserFriends(null);
  }

  render() {
    const { currentUser, userFriends } = this.props;
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route
              path='/chat'
              element={currentUser ? <Chatpage /> : <Navigate replace to='/' />}
            />
            <Route
              exact
              path='/signin'
              element={
                currentUser ? <Navigate replace to='/chat' /> : <SignInUpPage />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userFriends: selectCurrentUserFriends,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  fetchUserFriendsAsync: (currentUser) =>
    dispatch(fetchUserFriendsAsync(currentUser)),
  setCurrentUserFriends: (currentUser) =>
    dispatch(setCurrentUserFriends(currentUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
