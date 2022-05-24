import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import EndPoint from "../const/EndPoint";
import {Image} from 'cloudinary-react';
import {Navigate, useNavigate} from "react-router";
import {Context} from "../../index";
import {observer} from 'mobx-react-lite'
import {CircularProgress, Spin} from "react-cssfx-loading";
import {toast} from "react-hot-toast";

const HotelsOnHomePage = observer(() => {
    const [offset, setOffset] = useState(0);
    const [hotelsLenght, setHotelsLenght] = useState(0);
    const [allHotels, setAllHotels] = useState(null)
    const navigate = useNavigate();

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

    const goToHotelPage = async (id) => {
        const hotel = await axios.get(`${EndPoint}api/hotel/${id}`)
        if (hotel) {
            indexHotel.setHotelFromHomePage(hotel.data.hotel)
        }
        navigate('/hotelPage')
    }

    return (
        <div className='home_image_container'>
            {indexHotel.searchHotel.length ? <Navigate to='/search'/> : null}
            <div className='home_image_title'>
                Некоторые отели из нашего сервиса
            </div>
            {indexHotel.homeHotel.length ?
                <div className='home_images_container'>
                    {indexHotel.homeHotel.map(hotel =>
                        <div key={hotel.id} onClick={() => goToHotelPage(hotel.id)} style={{cursor:'pointer'}}>
                           <Image
                           cloudName = "dz3dswxup"
                           publicId = {hotel.photo}/>
                            <div className='hotel_image_title'>
                               Отель: {hotel.name}
                            </div>
                        </div>)}
                </div> :         <div className="spinner-container">
                    <CircularProgress color='blue' style={{height:'200px', width:'200px', marginTop:'50px'}}/>
                </div>}
        </div>
    )
});

export default HotelsOnHomePage;