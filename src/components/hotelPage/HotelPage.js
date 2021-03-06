import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import axios from "axios";
import EndPoint from "../const/EndPoint";
import RoomTable from "./RoomTable";
import {YMaps, Map, Placemark} from 'react-yandex-maps';
import {Image} from "cloudinary-react";

const HotelPage = observer(() => {
    const [hotel, setHotel] = useState(null);
    const [address, setAddress] = useState(null);
    const {indexHotel, rooms, dateBooked} = useContext(Context);

    useEffect (async () => {
        if (!hotel) {
            setHotel(indexHotel.needHotel);
            const  hotelRoom = await axios.get(`${EndPoint}api/room/hotel?hotelId=${indexHotel.needHotel.id}`)
           //const a = await axios.get('https://nominatim.openstreetmap.org/search?q=Минск Сухаревская 12&limit=1&format=json');
            const address = await axios.get(`http://api.positionstack.com/v1/forward?access_key=83c626e9ffed17669baf15895c02186f&query=${indexHotel.needHotel.country} ${indexHotel.needHotel.city} ${indexHotel.needHotel.street}`);
            setAddress({lat: parseFloat(address.data.data[0].latitude), lng: parseFloat(address.data.data[0].longitude)});
            indexHotel.setNeedHotel({});
            rooms.setRooms(hotelRoom.data.rooms);
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
                <div className='hotel_title_container'>
                    <div className="check">
                        <Image
                            cloudName = "dz3dswxup"
                            publicId = {hotel.photo}
                        width='400px'
                            height='400px'/>
                    </div>
                    <div className='hotel_map'>
                        {address?.lng ?
                        <YMaps>
                            <Map defaultState={{center: [address.lat, address.lng], zoom: 15}} width='1000px' height='400px'>
                                <Placemark geometry={[address.lat, address.lng]}/>
                            </Map>
                        </YMaps> : null}
                    </div>
                </div>
                    {rooms.Rooms.length ? <div className='hotel_rooms_container'>
                        {rooms.Rooms.map(room => (
                                <RoomTable key={room.id} room={room}/>
                            ))}
                        </div>: null}

            </div>
            : <div>Loading</div>}
        </div>
    )
});

export default HotelPage;