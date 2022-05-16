import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Context} from "../../index";
import Image from "../../img/img.png";

const AddRoomPage = observer(() => {
    const {view} = useContext(Context);
    useEffect(() => {
        view.setIsView(false);
    })
    return (
        <div className='add_room_page_container'>
            <img src={Image.toString()} width='100px' height='100px'/>
            <form>
                <label>Название</label><input type='text' required/><br/>
                <label>Описание</label><input  type='text' required/><br/>
                <label>Тип</label><input type='text' required/><br/>
                <label>Номер комнаты</label><input type='text' required/><br/>
                <label>Цена</label><input type='text' required/><br/>
                <label>Количество людей</label><input  type='text' required/><br/>
                <label>Коилчество комнат</label>+ -<br/>
                <input type="submit" name="submit" className="button-7" role="button"/>
            </form>
        </div>
    )
});

export default AddRoomPage