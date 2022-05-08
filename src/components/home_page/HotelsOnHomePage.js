import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import EndPoint from "../const/EndPoint";
import {Image} from 'cloudinary-react';
import {Navigate} from "react-router";
import {Context} from "../../index";
import {observer} from 'mobx-react-lite'

const HotelsOnHomePage = observer(() => {
    const [offset, setOffset] = useState(0);
    const [hotelsLenght, setHotelsLenght] = useState(0);
    const [allHotels, setAllHotels] = useState(null)

    const{indexHotel} = useContext(Context);

    useEffect( () => {
        const interval = setInterval(async () => {
            if (!allHotels && !hotelsLenght) {
                const hotelsLength = await axios.get(`${EndPoint}api/hotel/`);
                setHotelsLenght(hotelsLength.data.hotels.length);
                setAllHotels(hotelsLength.data.hotels);
                indexHotel.setHomeHotel(hotelsLength.data.hotels.slice(offset, 5));
                setOffset(5);
            } else {
                if (offset + 5 <= hotelsLenght) {
                    indexHotel.setHomeHotel(allHotels.slice(offset, offset+5));
                    setOffset(offset + 5);
                } else {
                    indexHotel.setHomeHotel(allHotels.slice(0, 5));
                    setOffset(5);
                }
            }
        }, 10000);
        return () => clearInterval(interval);
    }, [allHotels, hotelsLenght, offset])

    return (
        <div className='home_image_container'>
            {indexHotel.searchHotel.length ? <Navigate to='/search'/> : null}
            <div className='home_image_title'>
                Некоторые отели из нашего сервиса
            </div>
            {indexHotel.homeHotel.length ?
                <div className='home_images_container'>
                    {indexHotel.homeHotel.map(hotel =>
                        <div key={hotel.id}>
                           <Image
                           cloudName = "dz3dswxup"
                           publicId = 'v1650200281/test_dngcip.jpg'/>
                            <div className='hotel_image_title'>
                                {hotel.name}
                            </div>
                        </div>)}
                </div> : <div>Loading</div>}
        </div>
    )
});

export default HotelsOnHomePage;