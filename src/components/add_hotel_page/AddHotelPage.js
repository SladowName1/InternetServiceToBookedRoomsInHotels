import {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import Image from '../../img/img.png';

const AddHotelPage = observer(() => {
    const {view} = useContext(Context);
    useEffect(() => {
        view.setIsView(false);
    })
    return (
        <div className='add_hotel_page_container'>
            <img src={Image.toString()} width='100px' height='100px'/>
            <form>
                <label>Нзвание</label><input type='text' required/><br/>
                <label>Email</label><input  type='text' required/><br/>
                <label>Номер телефона</label><input type='text' required/><br/>
                <label>Страна</label><input type='text' required/><br/>
                <label>Город</label><input type='text' required/><br/>
                <label>Улица</label><input  type='text' required/><br/>
                <label>Количество звезд</label><input type='text' required/><br/>
                <label>Описание</label><input type='text' required/><br/>
                <input type="submit" name="submit" className="button-7" role="button"/>
            </form>
        </div>
    )
});

export default AddHotelPage;