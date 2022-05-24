import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import "../../styles/login.css";
import EndPoint from '../const/EndPoint';
import {Context} from "../../index";

const Login = ({ active, setActive }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {user} = useContext(Context);

  const submitLogin = async () => {
      try{
          const res = await axios.post(`${EndPoint}api/user/token?username=${login}&password=${password}`);
          if(res.data.access_token) {
              localStorage.setItem('token', res.data.access_token);
              const config = {
                  headers: { Authorization: `Bearer ${res.data.access_token}` }
              };

              const getUser = await axios.get(`${EndPoint}api/user/email?email=${login}`,config)
              user.setUser(getUser.data.user);

              setActive(false);
              setError('');
              setLogin('');
              setPassword('');
          }
      } catch (err) {
       if(err.response) {
           setError(err.response.data.message);
       }
      }
  }

  const cancel = () => {
      setActive(false);
      setError('');
      setLogin('');
      setPassword('');
  }

  return (
    <div className="login-container">
        {error ? <div>{error}</div> : null}
      <div className="login-input-container login-email-container">
        <input className="login-input" placeholder="Email" value={login} onChange={(e) => {setLogin(e.target.value)}}/>
      </div>
      <div className="login-input-container">
        <input type="password" className="login-input" placeholder="Пароль" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
      </div>
      <div className="login-button-container">
          <button onClick={() => submitLogin()}>Авторизация</button>
          <button onClick={() => cancel()}>Отмена</button>
      </div>
    </div>
  );
};

export default Login;
