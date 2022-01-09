// import FormInput from "../form-input/form-input.component";
import React, { Component } from "react";
import { signInWithGoogle } from "../../firebase/firebase.util";
import Button from "../button/button";
import "./Sign-in.styles.scss";
import { ReactComponent as Logo } from "./google.svg";
export default class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      hidden: "",
    };
  }
  handelSubmit = (e) => {
    e.preventDefault();
    this.setState({ email: "", password: "" });
  };
  handlechange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value }, () => {
      console.log(this.state);
    });
  };
  render() {
    return (
      <div className='Form'>
        <form className='Form-Sign-in' onSubmit={this.handelSubmit}>
          <Button
            children='Sign in with google '
            Logo={<Logo />}
            signin
            onClick={signInWithGoogle}
          />
          <Button
            children='Sign in With Email and Password'
            signin
            onClick={this.props.handlepopup}
          />
        </form>
      </div>
    );
  }
}
