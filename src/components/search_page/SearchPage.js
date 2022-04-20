import React, {useState} from 'react';
import FiltersElement from "./FiltersElement";
import ListElement from "./ListElement";

const SearchPage = ({hotels}) => {
    const [test, setTest] = useState(false);

    return(
        <div className='search_page_container'>
            <FiltersElement test={test} setTest={setTest}/>
            <ListElement  test={test} setTest={setTest} hotels={hotels}/>
        </div>
    )
}

export default  SearchPage;