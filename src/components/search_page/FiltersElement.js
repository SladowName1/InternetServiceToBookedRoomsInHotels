import {useState} from "react";

const FiltersElement = () => {
    const [isShowPrice, setIsShowPrice] = useState(false);
    const [isShowNumberOfPrice, setIsShowNumberOfPrice] = useState(false);
    const [isShowCustomerRaiting, setIsShowCustomerRaiting] = useState(false);
    const [isShowPopularFilter, setIsShowPopularFilter] = useState(false);
    const [priceRoom, setPriceRoom] = useState(100);
    const [customerRaiting, setCustomerRaiting] = useState(10);


    return(
        <div className='filter_container'>
            <div className='filter_element'>
                <input placeholder='Поиск' style={{borderRadius:'5px', border:'1px solid blue', height:'27px'}}/>
            </div>
            <div className='filter_element'>
                <div className='filter_element_title' style={{cursor:"pointer"}} onClick={() => {setIsShowPrice(!isShowPrice)}}>
                    Стоймость
                </div>
                <div style={isShowPrice ? {display:"block"}: {display:"none"}}>
                    <div>{priceRoom}</div>
                    <input type='range' min='0' max='500' defaultValue='100' step='1' onInput={(e) => {setPriceRoom(e.target.value)}}/>
                </div>
            </div>
            <div className='filter_element'>
                <div className='filter_element_title' style={{cursor:"pointer"}} onClick={() => {setIsShowPopularFilter(!isShowPopularFilter)}}>
                    Популярные фильтры
                </div>
                <div style={isShowPopularFilter ? {display:"block"}: {display:"none"}}>
                    <ul>
                        <li>
                            <input type='checkbox'/>
                            <label>Завтрак включен</label>
                        </li>
                        <li>
                            <input type='checkbox'/>
                            <label>Бассейн</label>
                        </li>
                        <li>
                            <input type='checkbox'/>
                            <label>Парковка</label>
                        </li>
                        <li>
                            <input type='checkbox'/>
                            <label>Спа</label>
                        </li>
                        <li>
                            <input type='checkbox'/>
                            <label>Можно с питомцами</label>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='filter_element'>
                <div className='filter_element_title' style={{cursor:"pointer"}} onClick={() => {setIsShowNumberOfPrice(!isShowNumberOfPrice)}}>
                    Количество звезд
                </div>
                <div style={isShowNumberOfPrice ? {display:"block"}: {display:"none"}}>
                    <ul>
                        <li>
                            <input type='checkbox'/>
                            <label>5 звезд</label>
                        </li>
                        <li>
                            <input type='checkbox'/>
                            <label>4 звезды</label>
                        </li>
                        <li>
                            <input type='checkbox'/>
                            <label>3 звезды</label>
                        </li>
                        <li>
                            <input type='checkbox'/>
                            <label>2 звезды</label>
                        </li>
                        <li>
                            <input type='checkbox'/>
                            <label>1 звезда</label>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='filter_element'>
                <div className='filter_element_title' style={{cursor:"pointer"}} onClick={() => {setIsShowCustomerRaiting(!isShowCustomerRaiting)}}>
                    Оценка посетителей
                </div>
                <div style={isShowCustomerRaiting ? {display:"block"}: {display:"none"}}>
                    <div>{customerRaiting}</div>
                    <input type='range' min='0' max='10' defaultValue='10' step='1' onInput={(e) => {setCustomerRaiting(e.target.value)}}/>
                </div>
            </div>
        </div>
    )
}

export default FiltersElement;