import React, {useContext, useEffect, useState} from 'react';
import FiltersElement from "./FiltersElement";
import ListElement from "./ListElement";
import {Context} from "../../index";

const SearchPage = () => {
    const [test, setTest] = useState(false);

    return(
        <div className='search_page_container'>
            <FiltersElement test={test} setTest={setTest}/>
            <ListElement  test={test} setTest={setTest}/>
        </div>
    )
}

export default  SearchPage;