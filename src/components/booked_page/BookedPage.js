import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import axios from "axios";
import EndPoint from "../const/EndPoint";

const BookedPage = observer(() => {
    const {user, view} = useContext(Context);
    const [rooms, setRooms] = useState(null);

    useEffect(async () => {
        view.setIsView(false);
        if (!rooms) {
            const roomsByUserId = await axios.get(`${EndPoint}api/room/getByUserId?email=${user.User.email}`);
            console.log(roomsByUserId);
            setRooms(roomsByUserId.data.rooms);
        }
    })

    return(
        <div>
            {rooms?.length ?
            <table width='100%' style={{borderCollapse:'separate',borderSpacing:' 0 1em'}}>
                <tr width='100%'>
                    <th>Номер</th>
                    <th>Дата заселения</th>
                    <th>Дата выселения</th>
                    <th>Цена</th>
                </tr>
                {rooms.map(room => (
                    <tr key={room.id} width='100%' style={{ textAlign: 'center'}}>
                        <td>{room.bookeNumber}</td>
                        <td>{room.start}</td>
                        <td>{room.end}</td>
                        <td>{room.cost} $</td>
                    </tr>
                    ))}
            </table> : <div><h2>У вас нету забронированных комнат</h2></div>}
        </div>
    )
});

export default BookedPage;