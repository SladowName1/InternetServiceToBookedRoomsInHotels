import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import SearchPage from "../search_page/SearchPage";
import ProfilePage from "../profile_page/ProfilePage";
import HotelPage from "../hotelPage/HotelPage";

const AppRouting = () =>{
    return (
        <Routes>
            <Route path='' element={<Home/>}/>
            <Route path='/search' element = {<SearchPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/hotelPage' element={<HotelPage/>}/>
        </Routes>
    )
}
export default AppRouting;