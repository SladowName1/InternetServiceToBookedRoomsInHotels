import React, {useEffect, useState} from 'react';
import axios from "axios";
import EndPoint from "../const/EndPoint";
import {Image} from 'cloudinary-react';

const HotelsOnHomePage = () => {
    const [offset, setOffset] = useState(0);
    const [hotels, setHotels] = useState(null);
    const [hotelsLenght, setHotelsLenght] = useState(0);
    const [allHotels, setAllHotels] = useState(null)

    useEffect( () => {
        const interval = setInterval(async () => {
            if (!allHotels && !hotelsLenght) {
                const hotelsLength = await axios.get(`${EndPoint}api/hotel/`);
                setHotelsLenght(hotelsLength.data.hotels.length);
                setAllHotels(hotelsLength.data.hotels);
                setHotels(hotelsLength.data.hotels.slice(offset, 5));
                setOffset(5);
            } else {
                if (offset + 5 <= hotelsLenght) {
                    setHotels(allHotels.slice(offset, offset+5));
                    setOffset(offset + 5);
                } else {
                    setHotels(allHotels.slice(0, 5));
                    setOffset(5);
                }
            }
        }, 10000);
        return () => clearInterval(interval);
    }, [allHotels, hotelsLenght, offset])

    return (
        <div className='home_image_container'>
            <div className='home_image_title'>
                Некоторые отели из нашего сервиса
            </div>
            {hotels ?
                <div className='home_images_container'>
                    {hotels.map(hotel =>
                        <div key={hotel.id}>
                           <Image
                           cloudName = "dz3dswxup"
                           publicId = 'v1650200281/test_dngcip.jpg'/>
                            <div className='hotel_image_title'>
                                {hotel.name}
                            </div>
                        </div>)}
                </div> : <div>Loading</div>}
            {/*<div className='home_images_container'>*/}
            {/*    <div>*/}
            {/*        <img src={Image} alt="Loading"/>*/}
            {/*        <div className='hotel_image_title'>*/}
            {/*            First Hotel*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <img src={Image} alt="Loading"/>*/}
            {/*        <div className='hotel_image_title'>*/}
            {/*            Second Hotel*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <img src={Image} alt="Loading"/>*/}
            {/*        <div className='hotel_image_title'>*/}
            {/*            Third Hotel*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <img src={Image} alt="Loading"/>*/}
            {/*        <div className='hotel_image_title'>*/}
            {/*            Fourth Hotel*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <img src={Image} alt="Loading"/>*/}
            {/*        <div className='hotel_image_title'>*/}
            {/*            Fifth Hotel*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default HotelsOnHomePage;