import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Menu from "./components/Menu";
import './styles/index.css';
import './styles/home-image.css';
import './styles/footer.css';
import './styles/search-page.css'
import AboutService from "./components/AboutService";
import BookingSearch from "./components/home_page/BookingSearch";

ReactDOM.render(
  <div className='index_container'>
    <Menu />
      <div className='booking_search_container_all'>
          <BookingSearch/>
      </div>
    <App />
    <AboutService/>
  </div>,
  document.getElementById("root")
);