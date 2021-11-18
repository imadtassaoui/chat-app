// import FormInput from "../form-input/form-input.component";
import React, { Component } from "react";
import { signInWithGoogle } from "../../firebase/firebase.util";
import Button from "../button/button";
import "./Sign-in.styles.scss";
import { ReactComponent as Logoo } from "./google.svg";
import { ReactComponent as Logo } from "./github.svg";
export default class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
          {/* <FormInput
            placeholder='Login'
            type='email'
            onChange={this.handlechange}
            header='Create your account'
            name='email'
            value={this.state.email}
            required
          />
          <FormInput
            placeholder='Password'
            type='password'
            onChange={this.handlechange}
            name='password'
            value={this.state.password}
            required
          /> 
          */}

          <Button
            children='Sign in with google '
            Logo={<Logoo />}
            signin
            onClick={signInWithGoogle}
          />
          <Button
            children='Sign in With GitHub'
            Logo={<Logo />}
            signin
            onClick={signInWithGoogle}
          />
          <Button
            children='Sign Up with phone or email'
            signin
            onClick={signInWithGoogle}
          />
        </form>
      </div>
    );
  }
}
