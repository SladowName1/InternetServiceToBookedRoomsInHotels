import React, {useState} from "react";
import axios from "axios";
import EndPoint from "../const/EndPoint";

const Registration = ({ active, setActive }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');

    const registration = async () => {
        if (password === repeatPassword) {
            try {
                const data = {
                    Email: login,
                    Password: password
                }
                const res = await axios.post(`${EndPoint}api/user/registration`, data);
                localStorage.setItem('token', res.data.access_token);
                setActive(false);
                setError('');
                setLogin('');
                setPassword('');
                setRepeatPassword('');
            } catch (err) {
                if (err.response) {
                    console.log('here')
                    setError(err.response.data.message);
                }
            }
        }
        else
            {
                setError('Пароли не совпадают')
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
                {error ? <div>{error}</div> : null}
                <div className="login-input-container login-email-container">
                    <input className="login-input" placeholder="Почта" value={login} onChange={(e) => {
                        setLogin(e.target.value)
                    }}/>
                </div>
                <div className="login-input-container">
                    <input className="login-input" placeholder="Пароль" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }}/>
                </div>
                <div className="login-input-container">
                    <input className="login-input" placeholder="Повтор пароля" value={repeatPassword} onChange={(e) => {
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
