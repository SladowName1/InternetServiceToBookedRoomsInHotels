import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {Image} from "cloudinary-react";

const RoomTable = () => {
    const [roomsToTable, setRoomsToTable] = useState([]);
    const {rooms} = useContext(Context);

    useEffect(async () => {
        if (!roomsToTable.length) {
            setRoomsToTable(rooms.Rooms);
            rooms.setRooms([]);
        }
    })
    return(
        <div className='room_table_container'>
            {roomsToTable.length ? <div>
                {roomsToTable.map(room => (
                    <div key={room.id} className='room_table_item_container'>
                        <div>
                            <Image
                                cloudName="dz3dswxup"
                                publicId='https://res.cloudinary.com/dz3dswxup/image/upload/v1650200281/test_dngcip.jpg'
                                width="300"
                                crop="scale"
                            />
                        </div>
                        <div>
                            {room.description}
                        </div>
                        <div>
                            cost for night
                        </div>
                        <div>
                            <button>Reserv</button>
                        </div>
                    </div>
                ))}
            </div> : <div>Loading</div>}
        </div>
    )
}

export default  RoomTable;