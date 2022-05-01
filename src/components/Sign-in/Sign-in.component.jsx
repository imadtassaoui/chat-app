// import FormInput from "../form-input/form-input.component";
import React, { useState } from "react";
import { signInWithGoogle } from "../../firebase/firebase.util";
import CustomButton from "../button/button";
import "./Sign-in.styles.scss";
import { ReactComponent as Logo } from "./google.svg";
import {
  Modal,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Group,
} from "@mantine/core";
import { At, Lock } from "tabler-icons-react";
import { PasswordStrength } from "../password-input/password-component";
const SignIn = () => {
  const [state, setState] = useState("");
  const [opened, setOpened] = useState(false);
  const handelSubmit = (e) => {
    e.preventDefault();
    setState({ email: "", password: "" });
  };
  const handlechange = (e) => {
    const { value, name } = e.target;
    console.log(state);
    setState({ ...state, [name]: value });
  };

  return (
    <div className='Form'>
      <form className='Form-Sign-in' onSubmit={handelSubmit}>
        <CustomButton
          children='Sign in with google '
          Logo={<Logo />}
          signin
          onClick={signInWithGoogle}
        />
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title='Create an Account'
        >
          <TextInput placeholder='Your name' label='Full name' required />
          <TextInput
            label='Your email'
            placeholder='Your email'
            onChange={handlechange}
            icon={<At size={14} />}
            required
          />
          <PasswordStrength />
          <PasswordInput
            label='Confirm password'
            onChange={handlechange}
            placeholder='Your password'
            icon={<Lock size={16} />}
          />
          <Checkbox sx={{ marginTop: 10 }} label='I agree to sell my privacy' />
          <Group spacing={100}>
            <a href='#@'>already have an Account ?</a>

            <Button sx={{ marginTop: 10 }}>Register</Button>
          </Group>
        </Modal>

        <CustomButton
          children='Sign in With Email and Password'
          signin
          onClick={() => setOpened(true)}
        />
      </form>
    </div>
  );
};

export default SignIn;
