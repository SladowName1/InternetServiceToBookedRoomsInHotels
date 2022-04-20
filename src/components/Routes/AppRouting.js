import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import SearchPage from "../search_page/SearchPage";
import ProfilePage from "../profile_page/ProfilePage";

const AppRouting = () =>{
    return (
        <Routes>
            <Route path='' element={<Home/>}/>
            <Route path='/search' element = {<SearchPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
        </Routes>
    )
}
export default AppRouting;