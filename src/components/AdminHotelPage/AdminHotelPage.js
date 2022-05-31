import {observer} from "mobx-react-lite";
import React, {useContext, useEffect} from "react";
import {Context} from "../../index";
import axios from "axios";
import EndPoint from "../const/EndPoint";
import {CircularProgress} from "react-cssfx-loading";
import Add from '../../img/add.png';
import Delete from '../../img/close.png';
import View from '../../img/eye.png';
import {useNavigate} from "react-router";

const HotelPageForManager = observer(() => {
    const {view, indexHotel, user, rooms} = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        view.setIsView(false)
        if(!indexHotel.managerHotels.length) {
            axios.get(`${EndPoint}api/hotel`)
                .then(res => {
                    indexHotel.setManagerHotel(res.data.hotels);
                })
        }
    })

    const deleteHotel = (id) => {
        axios.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${localStorage.getItem("token")}`;
        axios.post(`${EndPoint}api/hotel/delete?id=${id}`).then(resp => {
            axios.get(`${EndPoint}api/hotel`)
                .then(res => {
                    indexHotel.setManagerHotel(res.data.hotels);
                })
        })

    }

    const addRoom = (id) => {
        rooms.setHotelId(id);
        navigate('/addRoom')
    }

    const viewRoom = (id) => {
        rooms.setHotelId(id);
        navigate('/managerRoom')
    }

    return (
        <div>
            {indexHotel.managerHotels.length ?
                <table width='100%' style={{borderCollapse: 'separate', borderSpacing: ' 0 1em'}}>

                    <tr>
                        <th>Имя</th>
                        <th>Количество звезд</th>
                        <th>Страна</th>
                        <th>Действия</th>
                    </tr>
                    {indexHotel.managerHotels.map(hotel => (
                        <tr key={hotel.id} width='100%' style={{textAlign: 'center'}}>
                            <td>{hotel.name}</td>
                            <td>{hotel.countOfStar}</td>
                            <td>{hotel.country}</td>
                            <td>
                                <img src={Add.toString()} width='30px' style={{marginRight:'0.5rem', cursor:'pointer'}}
                                     onClick={() => addRoom(hotel.id)}/>
                                <img src={Delete.toString()} width='30px' style={{marginRight:'0.5rem', cursor:'pointer'}}
                                     onClick={() => deleteHotel(hotel.id)}/>
                                <img src={View.toString()} width='30px' style={{marginRight:'0.5rem', cursor:'pointer'}}
                                     onClick={() => viewRoom(hotel.id)}/>
                            </td>
                        </tr>
                    ))}
                </table>
                : <div className="spinner-container">
                    <CircularProgress color='blue' style={{height:'200px', width:'200px', marginTop:'50px'}}/>
                </div>
            }
        </div>
    )
});

export default HotelPageForManager;