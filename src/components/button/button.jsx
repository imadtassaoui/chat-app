import React from "react";
import "./button.scss";

function Button({ children, white, stroke, ...otherProps }) {
  return (
    <button className={`${white ? "white" : stroke ? "stroke" : ""} button`}>
      {children}
    </button>
  );
}

export default Button;
