import axios from "axios";
import React, { useState } from "react";
import "../../styles/login.css";

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = () => {
    const headres = {
      'Access-Control-Allow-Origin' : '*'
    };
    const data = {
      username: login,
      password: password
    };

    axios.post(`https://localhost:44307/api/user/token?username=${login}&password=${password}`, {headres: headres})
    .then(res => {
      localStorage.setItem('token', res.data.access_token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
      axios.get('https://localhost:44307/api/user/login')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    })
    .catch(err => {console.log(err)});
  }

  return (
    <div className="login-container">
      <div className="login-input-container login-email-container">
        <input className="login-input" placeholder="Email" value={login} onChange={(e) => {setLogin(e.target.value)}}/>
      </div>
      <div className="login-input-container">
        <input className="login-input" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
      </div>
      <div className="login-button-container">
          <button onClick={submitLogin}>Login</button>
          <button>Cancel</button>
      </div>
    </div>
  );
};

export default Login;
