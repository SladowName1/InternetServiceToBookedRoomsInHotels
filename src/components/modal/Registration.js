import React from "react";

const Registration = () => {
  return (
    <div>
      <div className="login-input-container login-email-container">
        <input className="login-input" placeholder="Email" />
      </div>
      <div className="login-input-container">
        <input className="login-input" placeholder="Password" />
      </div>
      <div className="login-input-container">
        <input className="login-input" placeholder="Repeat password" />
      </div>
      <div className="login-button-container">
        <button>Registration</button>
        <button>Cancel</button>
      </div>
    </div>
  );
};

export default Registration;
