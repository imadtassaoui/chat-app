import React from "react";
import Signin from "../../components/Sign-in/Sign-in.component";
import "./sign-In-Up.styles.scss";
import Button from "../../components/button/button";
import { useState } from "react";
import LoginPopup from "../../components/Login-Popup/Login-Popup.component";

const SignInUpPage = () => {
  const [Pop, setPop] = useState(false);
  return (
    <div className='SignIn-Up'>
      <div className='Login'>
        <h1>Join Un</h1>
        <Signin />
        <Button
          children='Sign Up with phone or email'
          signin
          onClick={() => setPop(!Pop)}
        />
        <span>
          by signing By signing up, you agree to our Terms of Service and
          Privacy Policy,
        </span>
        <span>
          Already have an account?<b> Sign in</b>
        </span>
      </div>
      <div className='Img-area'></div>
      <div>{Pop ? <LoginPopup close={setPop} /> : null}</div>
    </div>
  );
};

export default SignInUpPage;
