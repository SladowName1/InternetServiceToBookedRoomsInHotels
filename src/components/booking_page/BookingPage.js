import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import Image from '../../img/img.png';

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
            <div className='booking_page_title'>
                <div>
                    <img src={Image.toString()}/>
                </div>
                <div>
                    <p>TEXT qwyueuhojiqwpokqpw[pfqwjkgjoqwgqwg
                        qwigophqwjgkqw;lgk</p>
                </div>
            </div>
            <div className='booking_page_form_container'>
                <form className='booking_page_form'>
                    <label>Имя</label><input type='text' required/><br/>
                    <label>Фамилия</label><input  type='text' required/><br/>
                    <label>Email</label><input type='text' required/><br/>
                    <label>Номер телефона</label><input type='text' required/><br/>
                    <input type="submit" name="submit" className="button-7" role="button"/>
                </form>
            </div>
            {room ? <div>{room.id}</div> : <div>Loading</div>}
        </div>
    )
}

export default BookingPage;