import React, {createContext} from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Menu from "./components/Menu";
import './styles/index.css';
import './styles/home-image.css';
import './styles/footer.css';
import './styles/search-page.css';
import './styles/filter-component.css';
import './styles/list-element.css';
import './styles/hotel-page.css';
import './styles/room-table.css';
import './styles/booking-page.css';
import './styles/profile-page.css';
import './styles/add-hotel-page.css';
import './styles/add-room-page.css';
import AboutService from "./components/AboutService";
import BookingSearch from "./components/home_page/BookingSearch";
import HotelStore from "./components/store/HotelStore";
import RoomStore from "./components/store/RoomStore";
import UserStore from "./components/store/UserStore";
import ViewUpContainerStore from './components/store/ViewUpContainerStore';

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value ={{
        indexHotel: new HotelStore(),
        rooms: new RoomStore(),
        user: new UserStore(),
        view: new ViewUpContainerStore()
    }}>
        <div className='index_container'>
            <Menu />
            <BookingSearch/>
            <App />
            <AboutService/>
        </div>
    </Context.Provider>,
  document.getElementById("root")
);