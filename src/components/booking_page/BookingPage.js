import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";

const BookingPage = () => {
    const [room, setRoom] = useState(null);
    const {rooms} = useContext(Context);

    useEffect(() => {
        if(!room) {
            setRoom(rooms.Room);
        }
    })
    return(
        <div className='booking_page_container'>
            {room ? <div>{room.id}</div> : <div>Loading</div>}
        </div>
    )
}

export default BookingPage;