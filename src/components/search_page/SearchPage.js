import React from 'react';
import FiltersElement from "./FiltersElement";
import ListElement from "./ListElement";
import BookingSearch from "../home_page/BookingSearch";

const SearchPage = () => {
    return(
        <div className='search_page_container'>
            <FiltersElement/>
            <ListElement/>
        </div>
    )
}

export default  SearchPage;