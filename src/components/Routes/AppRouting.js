import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import SearchPage from "../search_page/SearchPage";
import ProfilePage from "../profile_page/ProfilePage";
import BookingPage from '../booking_page/BookingPage';
import HotelPage from "../hotelPage/HotelPage";
import AddHotelPage from "../add_hotel_page/AddHotelPage";
import AddRoomPage from "../add_hotel_page/AddRoomPage";
import HotelPageForManager from "../manager_hotel_page/HotelPageForManager";
import RoomPageForManager from "../manager_hotel_page/RoomPageForManager";
import UserPage from "../UserPage/UserPage";
import BookedPage from "../booked_page/BookedPage";
import Menu from "../Menu";
import AdminHotelPage from "../AdminHotelPage/AdminHotelPage";

const AppRouting = () =>{
    return (
        <Routes>
            <Route path='' element={<Home/>}/>
            <Route path='/search' element = {<SearchPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/hotelPage' element={<HotelPage/>}/>
            <Route path='/bookingPage' element={<BookingPage/>}/>
            <Route path='/addHotel' element={<AddHotelPage/>}/>
            <Route path='/addRoom' element={<AddRoomPage/>}/>
            <Route path='/managerHotel' element={<HotelPageForManager/>}/>
            <Route path='/userTable' element={<UserPage/>}/>
            <Route path='/bookedPage' element={<BookedPage/>}/>
            <Route path='/managerRoom' element={<RoomPageForManager/>}/>
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/adminHotels' element={<AdminHotelPage/>}/>
        </Routes>
    )
}
export default AppRouting;