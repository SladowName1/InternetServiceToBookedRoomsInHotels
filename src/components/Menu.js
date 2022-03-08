import React, { useState } from "react";
import ModalLogin from "./modal/ModalLogin";
import "../styles/menu.css";

const Menu = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="nav-menu">
      <div>Hotel APp</div>
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
