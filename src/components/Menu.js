import React, {useContext, useEffect, useState} from "react";
import ModalLogin from "./modal/ModalLogin";
import "../styles/menu.css";
import "../styles/home-search-element.css"
import {setGlobalHotels} from "./allData";
import {useNavigate} from "react-router";
import {Link, NavLink} from "react-router-dom";
import {Context} from "../index";
import {ToastContainer} from "react-toastify";

const Menu = () => {
  const [active, setActive] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const navigate = useNavigate();
  const {view, user, indexHotel} = useContext(Context);

  useEffect(() => {
      if(localStorage.getItem('token')){
          setIsUser(true);
      }
  })

  const toHomePage = () => {
      setGlobalHotels([]);
      view.setIsView(true);
      indexHotel.setSearchHotel([]);
      navigate('/');
  }

  const logout = () => {
      localStorage.removeItem('token')
      setIsUser(false);
      user.setUser(null);
      user.setUserInformation(null);
  }

  const goToBookedPage = () => {
      navigate('/bookedPage');
  }

  const goToAddHotelPage = () => {
      navigate('/addHotel');
  }

  const goToManagerHotelPage = () => {
      navigate('/managerHotel');
  }

  const goToUserPage =() => {
      navigate('/userTable');
  }

  const goToProfilePage = () => {
      navigate('/profile')
  }

  return (
    <div className="nav-menu">
      <div style={{cursor:'pointer', margin:'5px 10px 0 10px'}} onClick={() => toHomePage()}>
          Главная
      </div>
      <div className="nav-menu-items">
          {user.User?.role ?


              <div className="nav-menu-items">
                  {user.User.role === 'user' ?
                            <div className="nav-menu-item" onClick={() => goToBookedPage()}>Забронированные номера</div> :null}
                  {user.User.role === 'manager' ?
                      <div className="nav-menu-items">
                          <div className="nav-menu-item" onClick={() => goToAddHotelPage()}>Добавить отель</div>
                          <div className="nav-menu-item" onClick={() => goToManagerHotelPage()}>Отели</div> </div>:null}
                  {user.User.role === 'admin' ?
                          <div className="nav-menu-item" onClick={() => goToUserPage()}>Пользователи</div>:null}


                  <div className="nav-menu-item" onClick={() => goToProfilePage()}>Профиль</div>
                  <div className="nav-menu-item" onClick={() => logout()}>Выйти
                  </div>
              </div>
              :
              <div className="nav-menu-item" onClick={() => setActive(true)}>Авторизация</div>}
      </div>
      <ModalLogin active={active} setActive={setActive} />
    </div>
  );
};

export default Menu;
