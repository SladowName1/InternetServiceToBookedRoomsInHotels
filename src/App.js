import { BrowserRouter } from "react-router-dom";
import AppRouting from "./components/Routes/AppRouting";
import Menu from "./components/Menu";
import React from "react";
import BookingSearch from "./components/home_page/BookingSearch";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
          <Menu />
          <BookingSearch/>
        <AppRouting />
      </BrowserRouter>
    </div>
  );
}

export default App;
