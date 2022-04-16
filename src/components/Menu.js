import React, { useState } from "react";
import ModalLogin from "./modal/ModalLogin";
import "../styles/menu.css";
import "../styles/home-search-element.css"

const Menu = () => {
  const [active, setActive] = useState(false);

    const toHomePage = () => {
      window.location = window.location.origin;
  }

  return (
    <div className="nav-menu">
      <div style={{cursor:'pointer'}} onClick={() => toHomePage()}>
          Hotel App
      </div>
      <div className="nav-menu-items">
        <div className="nav-menu-item">Test</div>
        <div className="nav-menu-item">Test</div>
        <div className="nav-menu-item">Test</div>
        <div className="nav-menu-item" onClick={() => setActive(true)}>Login</div>
      </div>
      <ModalLogin active={active} setActive={setActive} />
    </div>
  );
};

export default Menu;
