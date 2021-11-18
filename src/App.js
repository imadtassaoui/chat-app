import Signin from "./components/Sign-in/Sign-in.component";
import "./App.css";
import { auth } from "./firebase/firebase.util";
import React, { Component } from "react";

class App extends Component {
  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged((user) =>
      this.setState({ currentUser: user })
    );
  }

  render() {
    return (
      <div>
        <Signin />
      </div>
    );
  }
}

export default App;
