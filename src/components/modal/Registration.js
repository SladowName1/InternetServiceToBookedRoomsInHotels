import React, {useContext, useState} from "react";
import axios from "axios";
import EndPoint from "../const/EndPoint";
import {Context} from "../../index";
import {toast} from "react-hot-toast";

const Registration = ({ active, setActive }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const {user} = useContext(Context);

    const registration = async () => {
        const checkEmail = document.getElementById('email_registration')?.validity.valid;
        const checkPassword = document.getElementById('password_registration')?.validity.valid;
        const checkSecondPassword = document.getElementById('second_password_registration')?.validity.valid;
        if(checkEmail && checkPassword && checkSecondPassword) {
            if (password === repeatPassword) {
                try {
                    const data = {
                        Email: login,
                        Password: password
                    }
                    const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
                    if(regex.test(login)) {
                        const res = await axios.post(`${EndPoint}api/user/registration`, data);
                        if(res.data.access_token) {
                            localStorage.setItem('token', res.data.access_token);
                            user.setUser(data);

                            const config = {
                                headers: { Authorization: `Bearer ${res.data.access_token}` }
                            };

                            const getUser = await axios.get(`${EndPoint}api/user/email?email=${login}`,config)
                            console.log(getUser);
                            user.setUser(getUser.data.user);
                            const getUserInfo = await axios.get(`${EndPoint}api/user/userInfo?id=${getUser.data.user.id}`, config);
                            user.setUserInformation(getUserInfo.data.userInfo);

                            setActive(false);
                            setError('');
                            setLogin('');
                            setPassword('');
                            setRepeatPassword('');
                        }
                    } else {
                        toast.error('введите валидный email');
                    }
                } catch (err) {
                    if (err.response) {
                        toast.error(err.response.data.message)
                    }
                }
            }
            else
            {
                toast.error('Пароли не совпадают')
            }
        } else {
            toast.error('Заполните все поля')
        }
    }

    const logout = () => {
        setActive(false);
        setError('');
        setLogin('');
        setPassword('');
        setRepeatPassword('');
    }

    return (
        <div>
            <div className="login-input-container login-email-container">
                <input className="login-input" id='email_registration' placeholder="Email" value={login} onChange={(e) => {
                    setLogin(e.target.value)
                }} required/>
            </div>
            <div className="login-input-container">
                <input type="password" className="login-input" id='password_registration' placeholder="Пароль" value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }} required/>
            </div>
            <div className="login-input-container">
                <input type="password" className="login-input" id='second_password_registration' placeholder="Повтор пароля" value={repeatPassword} onChange={(e) => {
                    setRepeatPassword(e.target.value)
                }} required/>
            </div>
            <div className="login-button-container">
                <button onClick={() => registration()}>Регистрация</button>
                <button onClick={() => logout()}>Отмена</button>
            </div>
        </div>
    );
};

export default Registration;
