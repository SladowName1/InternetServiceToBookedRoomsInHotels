import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import axios from "axios";
import EndPoint from "../const/EndPoint";
import {Navigate} from "react-router";
import {Image} from "cloudinary-react";

const ListElement = observer(() => {
    const {indexHotel} = useContext(Context);
    const [sortStar, setSortStar] = useState(false);

    const watchHotelRoom = async (id) => {
        const hotel = await axios.get(`${EndPoint}api/hotel/${id}`)
        if(hotel) {
            indexHotel.setNeedHotel(hotel.data.hotel);
        }
    }

    const sortHotels = () => {
        const hotels = indexHotel.searchHotel;
        if(!sortStar) {
            hotels.sort((a, b) => {
                return b.countOfStar - a.countOfStar;
            });
        } else {
            hotels.sort((a, b) => {
                return a.countOfStar - b.countOfStar;
            });
        }
        setSortStar(!sortStar);
        indexHotel.setSearchHotel(hotels);
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
                    <div className='sorted_container_element' onClick={() => sortHotels()}>Количеству звезд</div>
                    <div className='sorted_container_element'>Цене</div>
                </div>
            </div>
            <div className='list_container'>
                {indexHotel.searchHotel.length ?
                    <div>
                        {indexHotel.searchHotel.map(hotel =>
                            <div className='list_element' key={hotel.id}>
                                <div className='list_element_image_container'>
                                    <Image
                                        cloudName = "dz3dswxup"
                                        publicId = {hotel.photo}
                                        width='270px'
                                        height='270px'/>
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
                                    </div>
                                    <div className='list_element_booking'>
                                        <div style={{marginBottom: '30px'}}>
                                            Стоймость
                                        </div>
                                        <div>
                                            <button onClick={() => watchHotelRoom(hotel.id)} style={{background:'#0a3868', color:'white', border:'none', height:'33px', borderRadius:'5px', fontSize:'14px', cursor:'pointer'}}>Посмотреть</button>
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