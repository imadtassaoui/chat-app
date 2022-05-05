import React from "react";
import Signin from "../../components/Sign-in/Sign-in.component";
import { motion } from "framer-motion";
import "./sign-In-Up.styles.scss";

const SignInUpPage = () => {
  return (
    <motion.div
      exit={{ opacity: 0.2, transition: { duration: 0.3, ease: "easeInOut" } }}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } }}
      className=''
    >
      <div className='SignIn-Up'>
        <div className='Login'>
          <h1>Join Us</h1>
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
    </motion.div>
  );
};

export default SignInUpPage;
