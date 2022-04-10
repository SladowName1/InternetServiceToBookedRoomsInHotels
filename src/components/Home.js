import React from "react";
import BookingSearch from "./home_page/BookingSearch";
import HotelsOnHomePage from "./home_page/HotelsOnHomePage";

const Home = () => {

    return (
        <div className='home_container'>
            <div className='booking_search_container_all'>
                <BookingSearch/>
            </div>
            <HotelsOnHomePage/>
        </div>
    )
}

export default Home;