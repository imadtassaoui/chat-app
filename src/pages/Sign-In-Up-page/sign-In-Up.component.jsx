import React from "react";
import Signin from "../../components/Sign-in/Sign-in.component";
import "./sign-In-Up.styles.scss";

const SignInUpPage = () => {
  return (
    <div className='SignIn-Up'>
      <div className='Login'>
        <h1>Join Un</h1>
        <Signin />
        <span>
          by signing By signing up, you agree to our Terms of Service and
          Privacy Policy,
        </span>
        <span>
          Already have an account?<b> Sign in</b>
        </span>
      </div>
      <div className='Img-area'></div>
    </div>
  );
};

export default SignInUpPage;
