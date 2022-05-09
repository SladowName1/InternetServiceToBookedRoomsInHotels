import React from 'react';
import FiltersElement from "./FiltersElement";
import ListElement from "./ListElement";

const SearchPage = () => {

    return(
        <div className='search_page_container'>
            <FiltersElement/>
            <ListElement/>
        </div>
    )
}

export default  SearchPage;