import React from "react";
import "./form-input.styles.scss";
const FormInput = ({ header, handlechange, ...otherprops }) => {
  return (
    <div className='Form'>
      <div className='FormDiv'>
        {header ? (
          <div className='inputHeader'>
            <h1>Create your account</h1>
          </div>
        ) : null}
        <input className='FormInput' onChange={handlechange} {...otherprops} />
      </div>
    </div>
  );
};

export default FormInput;
