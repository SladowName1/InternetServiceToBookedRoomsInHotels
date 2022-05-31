import axios from "axios";
import React, {useContext, useState} from "react";
import "../../styles/login.css";
import EndPoint from '../const/EndPoint';
import {Context} from "../../index";
import {toast} from "react-hot-toast";

const Login = ({ active, setActive }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {user} = useContext(Context);

  const submitLogin = async () => {
      try{
          const name = document.getElementById('emailInput')?.validity.valid;
          const lastName = document.getElementById('passwordInput')?.validity.valid;
          if (name && lastName) {
              if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(login)) {
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
              }
              else {
                  toast.error("Введите ввалидный email")
              }
          }
          else {
              toast.error("Заполните все поля")
          }
      } catch (err) {
       if(err.response) {
           toast.error("Не правильный логин или пароль")
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
        <input className="login-input" id='emailInput' placeholder="Email" value={login} onChange={(e) => {setLogin(e.target.value)}} required/>
      </div>
      <div className="login-input-container">
        <input type="password" id='passwordInput' className="login-input" placeholder="Пароль" value={password} onChange={(e) => {setPassword(e.target.value)}} required/>
      </div>
      <div className="login-button-container">
          <button onClick={() => submitLogin()}>Авторизация</button>
          <button onClick={() => cancel()}>Отмена</button>
      </div>
    </div>
  );
};

export default Login;
