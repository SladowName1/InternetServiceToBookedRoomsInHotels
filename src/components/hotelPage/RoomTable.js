import {useContext, useEffect, useState} from "react";
import {Image} from "cloudinary-react";
import People from '../../img/people.png';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Navigate} from "react-router";

const RoomTable = observer(({room}) => {
    const [countOfPeople, setCountOfPeople] = useState([]);
    const [pageRoom, setRoomOnPage] = useState(null);
    const {rooms} = useContext(Context);

    useEffect(async () => {
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
            alert('Пожалуйста зарегистрируйтесь или зайдите в наш сервис')
        }
    }
    return(
        <div className='room_table_container'>
            {pageRoom ? <Navigate to='/bookingPage'/> : null}
                    <div className='room_table_item_container'>
                        <div>
                            <Image
                                cloudName="dz3dswxup"
                                publicId='https://res.cloudinary.com/dz3dswxup/image/upload/v1650200281/test_dngcip.jpg'
                                width="300"
                                crop="scale"
                            />
                        </div>
                        <div>
                            <div>Описание</div>
                            <div style={{margin:'10px 0 0 0'}}>{room.hasWifi ? <span style={{color:'green'}}>	&#10004;</span> : <span style={{color:'red'}}>&#10006;</span>}Бесплатный wifi</div>
                            <div>{room.hasBar ? <span style={{color:'green'}}>	&#10004;</span> : <span style={{color:'red'}}>&#10006;</span>} Бар</div>
                            <div>{room.viewOnSee ? <span style={{color:'green'}}>	&#10004;</span> : <span style={{color:'red'}}>&#10006;</span>} Вид на море</div>
                            <div>{room.hasJacuzzi ? <span style={{color:'green'}}>	&#10004;</span> : <span style={{color:'red'}}>&#10006;</span>} Джакузи</div>
                            <div>{room.hasSecondBathroom ? <span style={{color:'green'}}>	&#10004;</span> : <span style={{color:'red'}}>&#10006;</span>} Вторая душевая</div>
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
                            <div style={{color:'green', fontSize:'28px', margin:'10px 0 0 0 '}}>{room.cost} $</div>
                        </div>
                        <div>
                            <button style={{background:'#2568ff', margin:'100% 0 0 0', border:'none', borderRadius:'5px', width:'70px', height:'40px', cursor:'pointer'}}
                            onClick={() => goToReservPage()}>Reserv</button>
                        </div>
                    </div>
        </div>
    )
});

export default  RoomTable;