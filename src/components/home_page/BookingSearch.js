import React from 'react';
import BackGroundImageForSearchContainer from '../../img/background_search.jpg'

const BookingSearch = () => {
    return(
            <div className='booking_search_container'>
                <div>
                    Where you are going?
                </div>
                <div className='booking_search_container_element'>
                    <div className='booking_search_input'>
                        <input className='input_element_where' placeholder='e.g Minsk'/>
                    </div>
                    <div className='booking_search_input'>
                        <input className='input_element_at' placeholder='Check in'/>
                    </div>
                    <div className='booking_search_input'>
                        <input className='input_element_to' placeholder='Check out'/>
                    </div>
                    <div className='booking_search_input'>
                        <input className='input_element_who' placeholder='How much people?'/>
                    </div>
                    <div className='booking_search_input'>
                        <button className='button_search_hotels'>Search</button>
                    </div>
                </div>
            </div>
    )
}

export default BookingSearch;