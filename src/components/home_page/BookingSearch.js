import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import EndPoint from "../const/EndPoint";
import {setGlobalHotels} from "../allData";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const BookingSearch = observer(() => {
    const [cities, setCities] = useState(null);
    const [startDate, setStartDate] = useState(true);
    const [endDate, setEndDate] = useState(true);
    const [countOfPeople, setCountOfPeople] = useState(true);
    const [city, setCity] = useState(true);
    const [StartDate, SetStartDate] = useState(null);
    const [EndDate, SetEndDate] = useState(null);
    const [Cities, SetCities] = useState(null);
    const [CountOfPeople, SetCountOfPeople] = useState(null);
    const [hotels, setHotels] = useState([]);

    const{indexHotel} = useContext(Context);

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

    const searchClick = async () => {
        const count = document.getElementById('count_of_people').validity.valid;
        const city = document.getElementById('city_input').validity.valid;
        const start = document.getElementById('start_date_input').validity.valid;
        const end = document.getElementById('end_date_input').validity.valid;
        setStartDate(start);
        setEndDate(end);
        setCountOfPeople(count);
        setCity(city);
        if (count && city && start && end) {
            const ids = await axios.get(`${EndPoint}api/hotel/getReservation?StartBooking=${StartDate}&EndBooking=${EndDate}`);
            let stringIds = '';
            for (let i = 0; i < ids.data.ids.length; i++) {
                stringIds += `id[${i}]=${ids.data.ids[i]}&`;
            }
            const roomsIds = await axios.get(`${EndPoint}api/hotel/getRooms?CountOfPeople=${CountOfPeople}&${stringIds}`);
            let set = new Set(roomsIds.data.ids);
            Set.prototype.getByIndex = function(index) { return [...this][index]; }
            stringIds = '';
            for (let i = 0; i < set.size; i++) {
                stringIds += `ids[${i}]=${set.getByIndex(i)}&`;
            }
            const hotels = await axios.get(`${EndPoint}api/hotel/searchHotels?City=${Cities}&${stringIds}`);
            indexHotel.setSearchHotel(hotels.data.hotels);
        } else {
            alert('Пожалуйста заполните все поля')
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
                                <input id='city_input' className={city ? 'input_element_at' : 'input_element_at required_input_element'} placeholder='например Минск' type="text" name="city" list="cityname" value={Cities} onChange={(e) => SetCities(e.target.value)} required/>
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
                        <input id='start_date_input' type='date' value={StartDate} onChange={(e) => SetStartDate(e.target.value)} className={startDate ? 'input_element_at' : 'input_element_at required_input_element'} placeholder='Вьезд' required/>
                    </div>
                    <div className='booking_search_input'>
                        <input id='end_date_input' type='date' value={EndDate} onChange={(e) => SetEndDate(e.target.value)} className={endDate ? 'input_element_at' : 'input_element_at required_input_element'} placeholder='Выезд' required/>
                    </div>
                    <div className='booking_search_input'>
                        <input id='count_of_people' type='number' value={CountOfPeople} onChange={(e) => SetCountOfPeople(e.target.value)} className={countOfPeople ? 'input_element_at' : 'input_element_at required_input_element'} placeholder='Сколько людей' required/>
                    </div>
                    <div className='booking_search_input'>
                        <button className='button_search_hotels' onClick={async () => await searchClick()}>Найти</button>
                    </div>
                </div>
            </div>
        )
    });

export default BookingSearch;