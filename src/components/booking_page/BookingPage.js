import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import EndPoint from "../const/EndPoint";
import axios from "axios";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router";
import {Image} from "cloudinary-react";
import {toast} from "react-hot-toast";

const BookingPage = observer(() => {
    const [room, setRoom] = useState(null);
    const {rooms, user, dateBooked, indexHotel} = useContext(Context);
    const [name, setName] = useState(true);
    const [lastName, setLastName] = useState(true);
    const [email, setEmail] = useState(true);
    const [phone, setPhone] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(!room) {
            setRoom(rooms.Room);
        }
    })

    const submitBooking = async () => {
        const name = document.getElementById('nameInput')?.validity.valid;
        const lastName = document.getElementById('lastNameInput')?.validity.valid;
        const email = document.getElementById('emailInput')?.validity.valid;
        const phone = document.getElementById('phoneInput')?.validity.valid;
        setName(name);
        setLastName(lastName);
        setEmail(email);
        setPhone(phone);
        if ((name || user.UserInformation?.name) && (lastName || user.UserInformation?.lastName) && (email || user.User.email) && phone) {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            };
            const getUser = await axios.get(`${EndPoint}api/user/email?email=${user.User.email}`, config);
            if(getUser.data?.user?.id) {
                const data = {
                    RoomId: room.id,
                    DataStartBooking: dateBooked.IsStart,
                    DataEndBookin: dateBooked.IsEnd,
                    UserId: getUser.data.user.id,
                    Amount: rooms.Room.cost,
                }
                const resBooked = await axios.post(`${EndPoint}api/bookingroom/booked`,data, config);
                toast.success(resBooked.data.message);
                indexHotel.setSearchHotel([]);
                navigate('/')
            }
        } else {
            toast.error('???????????????????? ?????????????????? ?????? ????????')
        }
    }

    return(
        <div className='booking_page_container'>

            {room ?
            <div>
                <div className='booking_page_title'>
                    <div>
                        <Image
                            cloudName = "dz3dswxup"
                            publicId = {rooms.Room.photo}
                            width='270px'
                            height='270px'/>
                    </div>
                    <div>
                       ????????????????: {room.name}<br/><br/>
                        ??????????: {room.roomNumber}<br/><br/>
                       ????????????????: {room.description}<br/>
                    </div>
                </div>
                <div className='form_container'>
                    <label style={{marginTop:'2rem'}}>??????</label>
                    {user.UserInformation?.name ? <p>{user.UserInformation.name}</p> :
                    <input  type='text' id='nameInput' className={name ? '' : ' required_input_element'} required/>}<br/>

                    <label>??????????????</label>
                    {user.UserInformation?.lastName ? <p>{user.UserInformation.lastName}</p> :
                    <input type='text' id='lastNameInput' className={lastName ? '' : ' required_input_element'} required/>}<br/>

                    <label>Email</label>
                    {user.User?.email ? <p>{user.User.email}</p> :
                    <input type='text' id='emailInput' className={email ? '' : ' required_input_element'} required/>}<br/>

                    <label>?????????? ????????????????</label>
                    {user.UserInformation?.phone ? <p>{user.UserInformation.phone}</p> :
                    <input type='text' id='phoneInput' className={phone ? '' : ' required_input_element'} required/>}<br/>

                    <button className="button_search_hotels" style={{width:'200px', marginLeft:'auto', height:'33px'}} onClick={() => submitBooking()}>??????????????????</button>
                </div></div> : <div>Loading</div>}
        </div>
    )
});

export default BookingPage;