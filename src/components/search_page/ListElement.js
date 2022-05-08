import React, {useContext, useEffect} from "react";
import Image from "../../img/img.png";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import axios from "axios";
import EndPoint from "../const/EndPoint";
import {Navigate} from "react-router";

const ListElement = observer(() => {
    const {indexHotel} = useContext(Context);

    const watchHotelRoom = async (id) => {
        const hotel = await axios.get(`${EndPoint}api/hotel/${id}`)
        if(hotel) {
            indexHotel.setNeedHotel(hotel.data.hotel);

        }
    }

    return(
        <div className='index_list_element_container'>
            {indexHotel.needHotel.id ? <Navigate to='/hotelPage'/> : null}
            <div className='sorted_container'>
                <div className='sorted_container_title'>
                    {indexHotel.city}
                    {indexHotel.country}
                </div>
                <div className='sorted_container_by'>
                    <div className='sorted_container_by_title'>Сортировать по</div>
                    <div className='sorted_container_element'>Количеству дополнений</div>
                    <div className='sorted_container_element'>Количеству звезд</div>
                    <div className='sorted_container_element'>Оценке гостей</div>
                    <div className='sorted_container_element'>Цене</div>
                </div>
            </div>
            <div className='list_container'>
                {indexHotel.searchHotel.length ?
                    <div>
                        {indexHotel.searchHotel.map(hotel =>
                            <div className='list_element' key={hotel.id}>
                                <div className='list_element_image_container'>
                                    <img className='list_element_image' src={Image} alt="Loading" height='200px' width='270px'/>
                                </div>
                                <div className='list_element_all_information'>
                                    <div className='list_element_information'>
                                        <div className='list_element_hotel_name'>
                                            {hotel.name}
                                        </div>
                                        <div>
                                            {hotel.street}
                                        </div>
                                        <div>
                                            количество звезд: {hotel.countOfStar}
                                        </div>
                                        <div>
                                            Бенифиты
                                        </div>
                                    </div>
                                    <div className='list_element_booking'>
                                        <div style={{marginBottom: '30px'}}>
                                            Стоймость
                                        </div>
                                        <div>
                                            <button onClick={() => watchHotelRoom(hotel.id)}>Посмотреть</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    : <div> Loading </div>}

            </div>
        </div>
    )
});

export default ListElement;