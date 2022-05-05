import SignInUpPage from "./pages/Sign-In-Up-page/sign-In-Up.component";
import "./App.scss";
import { auth, createUserProfileDocument } from "./firebase/firebase.util";
import React, { useEffect } from "react";
import Homepage from "./pages/homepage/homepage";
import Chatpage from "./pages/chatpage/chatpage.component";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import { AnimatePresence } from "framer-motion/dist/framer-motion";

const App = ({ currentUser, setCurrentUser }) => {
  const location = useLocation();
  //multiFactor.user.displayName

  useEffect(() => {
    const unSubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
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
    return () => {
      unSubscribeFromAuth();
      setCurrentUserFriends(null);
    };
  }, [setCurrentUser]);

  return (
    <div>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
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
      </AnimatePresence>
    </div>
  );
};
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
