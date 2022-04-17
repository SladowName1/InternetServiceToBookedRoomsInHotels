import React, {useEffect, useState} from 'react';
import BackGroundImageForSearchContainer from '../../img/background_search.jpg'
import axios from "axios";
import EndPoint from "../const/EndPoint";
import Select from 'react-select'

const BookingSearch = () => {
    const [cities, setCities] = useState(null);
    const [startDate, setStartDate] = useState('');

    useEffect(async () => {
        const date = new Date();
        let start = date.getFullYear() + '-' + pad2(date.getMonth() + 1) + '-' + pad2(date.getDate());
        document.getElementById("start_date_input").setAttribute('min', start);
        document.getElementById("end_date_input").setAttribute('min', start);
        if (!cities) {
            const resCities = await axios.get(`${EndPoint}api/hotel/cities`);
            setCities(resCities.data.cities);
        } else {
            console.log(startDate);
            cities.map(city => {
                console.log(city);
            })
        }
    });

    const pad2 = (number) => {
        return (number < 10 ? '0' : '') +number;
    }

    return(
            <div className='booking_search_container'>
                <div>
                    Куда вы хотите поехать?
                </div>
                <div className='booking_search_container_element'>
                    <div className='booking_search_input'>
                            {cities?.length ?
                                <div>
                                <input className='input_element_at' placeholder='например Минск' type="text" name="city" list="cityname"/>
                                    <datalist id="cityname" className='input_element_at'>
                                        {cities.map((id, city) =>
                                            <option key={city} value={id}/>)}
                                    </datalist>
                                </div>
                            : <select>
                                    <option>Минск</option>
                                </select>}
                    </div>
                    <div className='booking_search_input'>
                        <input id='start_date_input' type='date' className='input_element_at' placeholder='Вьезд'/>
                    </div>
                    <div className='booking_search_input'>
                        <input id='end_date_input' type='date' className='input_element_to' placeholder='Выезд'/>
                    </div>
                    <div className='booking_search_input'>
                        <input type='number' className='input_element_who' placeholder='Сколько людей'/>
                    </div>
                    <div className='booking_search_input'>
                        <button className='button_search_hotels'>Найти</button>
                    </div>
                </div>
            </div>
    )
}

export default BookingSearch;