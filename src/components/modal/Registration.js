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
        if (password === repeatPassword) {
            try {
                const data = {
                    Email: login,
                    Password: password
                }
                const res = await axios.post(`${EndPoint}api/user/registration`, data);
                if(res.data.access_token) {
                    localStorage.setItem('token', res.data.access_token);
                    user.setUser(data);

                    const config = {
                        headers: { Authorization: `Bearer ${res.data.access_token}` }
                    };

                    const getUser = await axios.get(`${EndPoint}api/user/getByEmail?email=${login}`,config)
                    console.log(getUser);
                    user.setUser(getUser.data.user);

                    setActive(false);
                    setError('');
                    setLogin('');
                    setPassword('');
                    setRepeatPassword('');
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
                    <input className="login-input" placeholder="Email" value={login} onChange={(e) => {
                        setLogin(e.target.value)
                    }}/>
                </div>
                <div className="login-input-container">
                    <input type="password" className="login-input" placeholder="Пароль" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }}/>
                </div>
                <div className="login-input-container">
                    <input type="password" className="login-input" placeholder="Повтор пароля" value={repeatPassword} onChange={(e) => {
                        setRepeatPassword(e.target.value)
                    }}/>
                </div>
                <div className="login-button-container">
                    <button onClick={() => registration()}>Регистрация</button>
                    <button onClick={() => logout()}>Отмена</button>
                </div>
            </div>
        );
    };

export default Registration;
