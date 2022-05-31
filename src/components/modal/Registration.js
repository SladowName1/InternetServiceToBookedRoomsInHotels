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
        const name = document.getElementById('RegemailInput')?.validity.valid;
        const pass = document.getElementById('RegpasswordInput')?.validity.valid;
        const repeatPass = document.getElementById('RegrepeatPasswordInput')?.validity.valid;
        console.log(name);
        if(name && pass && repeatPass) {
            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(login)) {
                if (password === repeatPassword) {
                    try {
                        const data = {
                            Email: login,
                            Password: password
                        }
                        const res = await axios.post(`${EndPoint}api/user/registration`, data);
                        if (res.data.access_token) {
                            localStorage.setItem('token', res.data.access_token);
                            user.setUser(data);

                            const config = {
                                headers: {Authorization: `Bearer ${res.data.access_token}`}
                            };

                            const getUser = await axios.get(`${EndPoint}api/user/getByEmail?email=${login}`, config)
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
                } else {
                    toast.error('Пароли не совпадают')
                }
            } else {
                toast.error("Введите ввалидный email")
            }
        } else {
            toast.error("Заполните все поля")
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
                    <input className="login-input" id='RegemailInput' placeholder="Email" value={login} onChange={(e) => {
                        setLogin(e.target.value)
                    }} required/>
                </div>
                <div className="login-input-container">
                    <input type="password" className="login-input" id='RegpasswordInput' placeholder="Пароль" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} required/>
                </div>
                <div className="login-input-container">
                    <input type="password" className="login-input" id='RegrepeatPasswordInput' placeholder="Повтор пароля" value={repeatPassword} onChange={(e) => {
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
