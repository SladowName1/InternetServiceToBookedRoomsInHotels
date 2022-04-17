import React, {useEffect, useState} from 'react';
import BackGroundImageForSearchContainer from '../../img/background_search.jpg'
import axios from "axios";
import EndPoint from "../const/EndPoint";
import Select from 'react-select'

const BookingSearch = () => {
    const [cities, setCities] = useState(null);
    const [startDate, setStartDate] = useState(true);
    const [endDate, setEndDate] = useState(true);
    const [countOfPeople, setCountOfPeople] = useState(true);
    const [city, setCity] = useState(true);

    useEffect(async () => {
        const date = new Date();
        let start = date.getFullYear() + '-' + pad2(date.getMonth() + 1) + '-' + pad2(date.getDate());
        document.getElementById("start_date_input").setAttribute('min', start);
        document.getElementById("end_date_input").setAttribute('min', start);
        if (!cities) {
            const resCities = await axios.get(`${EndPoint}api/hotel/cities`);
            setCities(resCities.data.cities);
        }
    });

    const pad2 = (number) => {
        return (number < 10 ? '0' : '') +number;
    }

    const searchClick = () => {
        const count = document.getElementById('count_of_people').validity.valid;
        const city = document.getElementById('city_input').validity.valid;
        const start = document.getElementById('start_date_input').validity.valid;
        const end = document.getElementById('end_date_input').validity.valid;
        setStartDate(start);
        setEndDate(end);
        setCountOfPeople(count);
        setCity(city);
        if (count && city && start && end) {
            console.log('here');
        } else {
            console.log('fuck')
        }
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
                                <input id='city_input' className={city ? 'input_element_at' : 'input_element_at required_input_element'} placeholder='например Минск' type="text" name="city" list="cityname" required/>
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
                        <input id='start_date_input' type='date' className={startDate ? 'input_element_at' : 'input_element_at required_input_element'} placeholder='Вьезд' required/>
                    </div>
                    <div className='booking_search_input'>
                        <input id='end_date_input' type='date' className={endDate ? 'input_element_at' : 'input_element_at required_input_element'} placeholder='Выезд' required/>
                    </div>
                    <div className='booking_search_input'>
                        <input id='count_of_people' type='number' className={countOfPeople ? 'input_element_at' : 'input_element_at required_input_element'} placeholder='Сколько людей' required/>
                    </div>
                    <div className='booking_search_input'>
                        <button className='button_search_hotels' onClick={() => searchClick()}>Найти</button>
                    </div>
                </div>
            </div>
    )
}

export default BookingSearch;