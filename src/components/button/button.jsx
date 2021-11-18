import React from "react";
import "./button.scss";

function Button({ children, white, stroke, signin, Logo, ...otherProps }) {
  return (
    <button
      className={`${
        white ? "white" : stroke ? "stroke" : signin ? "signin" : ""
      } button`}
      {...otherProps}
    >
      {Logo}
      {children}
    </button>
  );
}

export default Button;
