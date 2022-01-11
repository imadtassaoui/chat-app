import React, { Component } from "react";
import "./Login-Popup.styles.scss";
import FormInput from "../form-input/form-input.component";
import { ReactComponent as Close } from "./Close.svg";
export default class LoginPopup extends Component {
  constructor(props) {
    super(props);
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
      <div className='PopUpContainer'>
        <div className='PopU'>
          <div className='head'>
            <span>TJchatApp</span>
            <Close
              className='closelogo'
              onClick={() => this.props.close(false)}
            />
          </div>

          <FormInput
            placeholder='Login'
            type='email'
            onChange={this.handlechange}
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
          <div className='Buttons'>
            <button> Connect </button>
            <p>Or</p>
            <button> Register </button>
            <a href='/chat'>Forgot password?</a>
          </div>
        </div>
      </div>
    );
  }
}
