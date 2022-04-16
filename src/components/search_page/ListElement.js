import {useEffect} from "react";
import Image from "../../img/img.png";

const ListElement = ({test, setTest}) => {

    return(
        <div className='index_list_element_container'>
            <div className='sorted_container'>
                <div className='sorted_container_title'>
                    Город и страна
                </div>
                <div className='sorted_container_by'>
                    <div className='sorted_container_by_title'>Сортировать по</div>
                    <div className='sorted_container_element'>Количеству дополнений</div>
                    <div className='sorted_container_element'>Количеству звезд</div>
                    <div className='sorted_container_element'>Оценке гостей</div>
                    <div className='sorted_container_element'>Цене</div>
                </div>
            </div>
            <div className='list_container'>
                <div className='list_element'>
                    <div className='list_element_image_container'>
                        <img className='list_element_image' src={Image} alt="Loading" height='200px' width='270px'/>
                    </div>
                    <div className='list_element_all_information'>
                        <div className='list_element_information'>
                            <div className='list_element_hotel_name'>
                                Название отеля
                            </div>
                            <div>
                                Улица город
                            </div>
                            <div>
                                Количество звезд
                            </div>
                            <div>
                                Бенифиты
                            </div>
                        </div>
                        <div className='list_element_booking'>
                            <div style={{marginBottom: '30px'}}>
                                Стоймость
                            </div>
                            <div>
                                <button>Посмотреть</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListElement;