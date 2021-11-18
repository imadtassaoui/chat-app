import FormInput from "../form-input/form-input.component";
import React, { Component } from "react";
import { signInWithGoogle } from "../../firebase/firebase.util";
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
      <div>
        <form onSubmit={this.handelSubmit}>
          <FormInput
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

          <button type='submit'> submit</button>
          <button onClick={signInWithGoogle}> google</button>
        </form>
      </div>
    );
  }
}
