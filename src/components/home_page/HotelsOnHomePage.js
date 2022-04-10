import React from 'react';
import Image from '../../img/img.png'

const HotelsOnHomePage = () => {
    return (
        <div className='home_image_container'>
            <div className='home_image_title'>
                Some hotels in this service
            </div>
            <div className='home_images_container'>
                <div>
                    <img src={Image} alt="Loading"/>
                    <div className='hotel_image_title'>
                        First Hotel
                    </div>
                </div>
                <div>
                    <img src={Image} alt="Loading"/>
                    <div className='hotel_image_title'>
                        Second Hotel
                    </div>
                </div>
                <div>
                    <img src={Image} alt="Loading"/>
                    <div className='hotel_image_title'>
                        Third Hotel
                    </div>
                </div>
                <div>
                    <img src={Image} alt="Loading"/>
                    <div className='hotel_image_title'>
                        Fourth Hotel
                    </div>
                </div>
                <div>
                    <img src={Image} alt="Loading"/>
                    <div className='hotel_image_title'>
                        Fifth Hotel
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelsOnHomePage;