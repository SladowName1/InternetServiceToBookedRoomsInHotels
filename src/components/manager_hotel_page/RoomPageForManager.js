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
        console.log(rooms.HotelId);
        console.log(rooms.ManagerRooms[0]?.hotelId);
        view.setIsView(false)
        if(!rooms.ManagerRooms?.length || rooms.ManagerRooms[0]?.hotelId !== rooms.HotelId) {
            axios.get(`${EndPoint}api/room/hotel?hotelId=${rooms.HotelId}`)
                .then(res => {
                    rooms.setManagerRooms(res.data.rooms);
                })
        }
    })

    const deleteRoom = (id) => {
        axios.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${localStorage.getItem("token")}`;
        axios.post(`${EndPoint}api/room/delete?id=${id}`).then(resp => {
            axios.get(`${EndPoint}api/room/hotel?hotelId=${rooms.HotelId}`)
                .then(res => {
                    rooms.setManagerRooms(res.data.rooms);
                })
        })

    }

    return (
        <div>
            {rooms.ManagerRooms?.length ?
                <table width='100%' style={{borderCollapse: 'separate', borderSpacing: ' 0 1em'}}>

                    <tr>
                        <th>Номер</th>
                        <th>Цена</th>
                        <th>Тип</th>
                        <th>Действия</th>
                    </tr>
                    {rooms.ManagerRooms.map(room => (
                        <tr key={room.id} width='100%' style={{textAlign: 'center'}}>
                            <td>{room.name}</td>
                            <td>{room.cost}</td>
                            <td>{room.type}</td>
                            <td>
                                <img src={Delete.toString()} width='30px' style={{marginRight:'0.5rem', cursor:'pointer'}}
                                     onClick={() => deleteRoom(room.id)}/>
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