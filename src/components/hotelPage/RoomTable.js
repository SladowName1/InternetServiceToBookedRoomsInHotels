import {useContext, useEffect, useState} from "react";
import {Image} from "cloudinary-react";
import People from '../../img/people.png';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Navigate} from "react-router";
import {toast} from "react-hot-toast";

const RoomTable = observer(({room}) => {
    const [countOfPeople, setCountOfPeople] = useState([]);
    const [pageRoom, setRoomOnPage] = useState(null);
    const {rooms} = useContext(Context);

    useEffect(async () => {
        console.log('here')
        console.log(room);
        if(!countOfPeople.length) {
            const array = [];
            for (let i = 0; i < room.countOfPeople; i++) {
                array.push(i+1);
            }
            setCountOfPeople(array);
            setRoomOnPage(null);
        }
    })

    const goToReservPage = () => {
        if(localStorage.getItem('token')) {
            setRoomOnPage(room);
            rooms.setRoom(room);
        } else {
            toast.error('Пожалуйста зарегистрируйтесь или зайдите в наш сервис')
        }
    }
    return(
        <div className='room_table_container'>
            {pageRoom ? <Navigate to='/bookingPage'/> : null}
                    <div className='room_table_item_container'>
                        <div>
                            <Image
                                cloudName="dz3dswxup"
                                publicId={room?.photo}
                                width="300"
                                crop="scale"
                            />
                        </div>
                        <div>
                            <div>Описание</div>
                            <div style={{margin:'10px 0 0 0'}}>{room.hasWifi ? <span style={{marginRight:'10px'}}>	&#10004;</span> : <span style={{marginRight:'10px'}}>&#10006;</span>}Бесплатный wifi</div>
                            <div>{room.hasBar ? <span style={{marginRight:'10px'}}>	&#10004;</span> : <span style={{marginRight:'10px'}}>&#10006;</span>} Бар</div>
                            <div>{room.viewOnSee ? <span style={{marginRight:'10px'}}>	&#10004;</span> : <span style={{marginRight:'10px'}}>&#10006;</span>} Вид на море</div>
                            <div>{room.hasJacuzzi ? <span style={{marginRight:'10px'}}>	&#10004;</span> : <span style={{marginRight:'10px'}}>&#10006;</span>} Джакузи</div>
                            <div>{room.hasSecondBathroom ? <span style={{marginRight:'10px'}}>	&#10004;</span> : <span style={{marginRight:'10px'}}>&#10006;</span>} Вторая душевая</div>
                        </div>
                        <div>
                            <div>Количество людей</div>
                            {countOfPeople.length ?
                                <div style={{display:'flex'}}>
                                    {countOfPeople.map(people => (
                                        <div key={people} style={{margin:'10px 0 0 0'}}>
                                            <img src={People.toString()} width='50px' height='40px'/>
                                        </div>
                                    ))}
                                </div> : null}
                        </div>
                        <div>
                            <div>Цена за ночь</div>
                            <div style={{fontWeight:'600', fontSize:'28px', margin:'10px 0 0 0 '}}>{room.cost} $</div>
                        </div>
                        <div>
                            <button className='button_search_hotels' style={{margin:'70% 0 0 0', border:'none', borderRadius:'5px', width:'130px', height:'40px', cursor:'pointer'}}
                            onClick={() => goToReservPage()}>Бронировать</button>
                        </div>
                    </div>
        </div>
    )
});

export default  RoomTable;