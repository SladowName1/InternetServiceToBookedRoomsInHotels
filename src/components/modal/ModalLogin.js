import React, { useState } from "react";
import '../../styles/modal-login.css'
import Login from "./Login";
import Registration from "./Registration";

const ModalLogin = ({active, setActive}) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isRegistration, setIsRegistraion] = useState(false);

    const setLoginTab = () => {
        if(isLogin) {
            setIsLogin(!isLogin);
            setIsRegistraion(isLogin);
        }
        else {
            setIsLogin(isRegistration);
            setIsRegistraion(!isRegistration);
        }
    }
    return(
        <div className={active ? 'modal_login modal_login_active' : 'modal_login'} onClick={() => setActive(false)}>
            <div className={active ? "modal_login_content_active modal_login_content" : "modal_login_content"} onClick={(e) => e.stopPropagation()} >
                <div>
                    <div onClick={setLoginTab}>Login</div>
                    <div onClick={setLoginTab}>Registration</div>
                </div>
                <div className={isLogin ? "active_login_tab" : "login_tab"}><Login/></div>
                <div className={isRegistration ? "active_login_tab" : "login_tab"}><Registration/></div> 
            </div>
        </div>
    )
}

export default ModalLogin;