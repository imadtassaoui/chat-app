import SignInUpPage from "./pages/Sign-In-Up-page/sign-In-Up.component";
import "./App.scss";
import { auth, firestore } from "./firebase/firebase.util";
import React, { Component } from "react";
import Homepage from "./pages/homepage/homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged((user) =>
      this.setState({ currentUser: user })
    );
    console.log(firestore.collection("users").doc("Yfg6wfho3e9MXIA6MeOB "));
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Homepage />}></Route>
            <Route path='/Signin' element={<SignInUpPage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
