import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
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
            const checkEmail = document.getElementById('email_login')?.validity.valid;
            const checkPassword = document.getElementById('password_login')?.validity.valid;
            if(checkEmail && checkPassword) {
                const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
                if(regex.test(login)) {
                    const res = await axios.post(`${EndPoint}api/user/token?username=${login}&password=${password}`);
                    if(res.data.access_token) {
                        localStorage.setItem('token', res.data.access_token);
                        const config = {
                            headers: { Authorization: `Bearer ${res.data.access_token}` }
                        };

                        const getUser = await axios.get(`${EndPoint}api/user/email?email=${login}`,config)
                        user.setUser(getUser.data.user);

                        const getUserInfo = await axios.get(`${EndPoint}api/user/userInfo?id=${getUser.data.user.id}`, config);
                        user.setUserInformation(getUserInfo.data.userInfo);

                        setActive(false);
                        setError('');
                        setLogin('');
                        setPassword('');
                    }
                } else {
                    toast.error('введите валидный email');
                }
            } else {
                toast.error('Заполните все поля');
            }

        } catch (err) {
            if(err.response) {
                toast.error(err.response.data.message);
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
                <input className="login-input" id='email_login' placeholder="Email" value={login} onChange={(e) => {setLogin(e.target.value)}} required/>
            </div>
            <div className="login-input-container">
                <input type="password" className="login-input" id='password_login' placeholder="Пароль" value={password} onChange={(e) => {setPassword(e.target.value)}} required/>
            </div>
            <div className="login-button-container">
                <button onClick={() => submitLogin()}>Авторизация</button>
                <button onClick={() => cancel()}>Отмена</button>
            </div>
        </div>
    );
};

export default Login;
