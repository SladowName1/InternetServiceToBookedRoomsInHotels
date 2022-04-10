import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Menu from "./components/Menu";
import './styles/index.css'
import './styles/home-image.css'

ReactDOM.render(
  <div>
    <Menu />
    <App />
  </div>,
  document.getElementById("root")
);