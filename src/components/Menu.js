import React, {useEffect, useState} from "react";
import ModalLogin from "./modal/ModalLogin";
import "../styles/menu.css";
import "../styles/home-search-element.css"

const Menu = () => {
  const [active, setActive] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
      if(localStorage.getItem('token')){
          setIsUser(true);
      }
  })

  const toHomePage = () => {
      window.location = window.location.origin;
  }

  const logout = () => {
      localStorage.removeItem('token');
      setIsUser(false);
  }

  return (
    <div className="nav-menu">
      <div style={{cursor:'pointer'}} onClick={() => toHomePage()}>
          Hotel App
      </div>
      <div className="nav-menu-items">
          {isUser?
              <div className="nav-menu-items">
                  <div className="nav-menu-item"><a href='/profile'>Профиль</a>
                  </div>
                  <div className="nav-menu-item" onClick={() => logout()}>Выйти
                  </div>
              </div> : <div className="nav-menu-item" onClick={() => setActive(true)}>Войти</div>}
      </div>
      <ModalLogin active={active} setActive={setActive} />
    </div>
  );
};

export default Menu;
