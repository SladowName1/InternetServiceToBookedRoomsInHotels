import axios from "axios";
import React, {useEffect, useState} from "react";
import "../../styles/login.css";
import EndPoint from '../const/EndPoint';

const Login = ({ active, setActive }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitLogin = async () => {
      try{
          console.log('qwfq')
          console.log(EndPoint);
          console.log('qwfq')
          const res = await axios.post(`${EndPoint}api/user/token?username=${login}&password=${password}`);
          localStorage.setItem('token', res.data.access_token);
          setActive(false);
          setError('');
          setLogin('');
          setPassword('');
      } catch (err) {
       if(err.response) {
           console.log('here')
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
        <input className="login-input" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
      </div>
      <div className="login-button-container">
          <button onClick={submitLogin}>Login</button>
          <button onClick={() => cancel()}>Cancel</button>
      </div>
    </div>
  );
};

export default Login;
