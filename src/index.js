import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Menu from "./components/Menu";
import './styles/index.css'
import './styles/home-image.css'
import './styles/footer.css'
import AboutService from "./components/AboutService";

ReactDOM.render(
  <div className='index_container'>
    <Menu />
    <App />
      <AboutService/>
  </div>,
  document.getElementById("root")
);