import React from "react";
import "../../styles/login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-input-container login-email-container">
        <input className="login-input" placeholder="Email" />
      </div>
      <div className="login-input-container">
        <input className="login-input" placeholder="Password" />
      </div>
      <div className="login-button-container">
          <button>Login</button>
          <button>Cancel</button>
      </div>
    </div>
  );
};

export default Login;
