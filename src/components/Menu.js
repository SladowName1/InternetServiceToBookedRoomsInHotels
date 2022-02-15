import React, { useState } from "react";
import ModalLogin from "./modal/ModalLogin";

const Menu = () => {
    const [active, setActive] = useState(false);
    return(
        <div>
            Menu
            <div onClick={() => setActive(true)}>
                Login
            </div>
            <ModalLogin active={active} setActive={setActive}/>
        </div>
    )
}

export default Menu;