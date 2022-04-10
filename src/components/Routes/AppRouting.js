import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import SearchPage from "../search_page/SearchPage";

const AppRouting = () =>{
    return (
        <Routes>
            <Route path='' element={<Home/>}/>
            <Route path='/search' element = {<SearchPage/>}/>
        </Routes>
    )
}
export default AppRouting;