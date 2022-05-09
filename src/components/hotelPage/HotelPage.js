import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import axios from "axios";
import EndPoint from "../const/EndPoint";
import RoomTable from "./RoomTable";

const HotelPage = observer(() => {
    const [hotel, setHotel] = useState(null);
    const [address, setAddress] = useState(null);
    const {indexHotel, rooms} = useContext(Context);
    const AnyReactComponent = ({ text }) => <div>{text}</div>;
    useEffect (async () => {
        if (!hotel) {
            setHotel(indexHotel.needHotel);
            const responseRoom = await axios.get(`${EndPoint}api/room/hotel?hotelId=${indexHotel.needHotel.id}`)
            const a = await axios.get('https://nominatim.openstreetmap.org/search?q=Минск Сухаревская 12&limit=1&format=json');
            setAddress({lat: a.data[0].lat, lng: a.data[0].lon});
            const address = await axios.get(`https://nominatim.openstreetmap.org/search?q=${indexHotel.needHotel.country} ${indexHotel.needHotel.city} ${indexHotel.needHotel.street}&limit=1&format=json`);
            indexHotel.setNeedHotel({});
            rooms.setRooms(responseRoom.data);
        }
    })

    return(<div>
        {hotel ?  <div className='hotel_page_container'>
                <div className='hotel_title'>
                    {hotel.name}
                </div>
                <div className='hotel_information'>
                    {hotel.street} {hotel.city} {hotel.country}
                </div>
                <div className='hotel_image'>
                    <div>
                        {hotel.img} image
                    </div>
                    <div>
                        Map
                    </div>
                </div>
                <div className='hotel_rooms_container'>
                    <RoomTable/>
                </div>
            </div>
            : <div>Loading</div>}
        </div>
    )
});

export default HotelPage;