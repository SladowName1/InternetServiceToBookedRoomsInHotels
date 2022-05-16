import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Context} from "../../index";
import axios from "axios";
import EndPoint from "../const/EndPoint";
import Image from '../../img/img.png';

const ProfilePage = observer(() => {
    const {user, view} = useContext(Context);

    useEffect(async () => {
        view.setIsView(false);
        if (!user.UserInformation) {
            const res = await axios.get(`${EndPoint}api/user/userInfo?email=${user.User.email}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            if(res.data.userInfo) {
                user.setUserInformation(res.data.userInfo)
            }
        }
    })
return(
    <div className='profile_page_container'>
        <div>
            {user.userInformation?.photo ?
                <div>
                    <img src={Image.toString()}/> <br/>
                    <button>Изменить</button>  <button>Удалить</button>
                </div> :
                <div>
                    <img src={Image.toString()}/> <br/>
                    <button>Добавить</button>
                </div>
                }
        </div>
        <div className='profile_page_info_container'>
           <div className='profile_page_info_element_container'>
               <div className='profile_page_element_title'>
                   Имя:
               </div>
               <div className='profile_page_element_value'>
                   { user.userInformation?.name ?
                       <div className='profile_page_element_value'>
                           {user.userInformation?.name}
                           <button>Изменить</button>
                       </div>
                       :
                       <div className='profile_page_element_value'>
                           <input type='text'/>
                           <button>Добавить</button>
                       </div>
                   }
               </div>
           </div>
            <div className='profile_page_info_element_container'>
                <div className='profile_page_element_title'>
                    Фамилия:
                </div>
                <div className='profile_page_element_value'>
                    { user.userInformation?.lastName ?
                        <div className='profile_page_element_value'>
                            {user.userInformation?.lastName}
                            <button>Изменить</button>
                        </div>
                        :
                        <div className='profile_page_element_value'>
                            <input type='text'/>
                            <button>Добавить</button>
                        </div>
                    }
                </div>
            </div>
            <div className='profile_page_info_element_container'>
                <div className='profile_page_element_title'>
                    Email:
                </div>
                <div className='profile_page_element_value'>
                    { user.userInformation?.email ?
                        <div className='profile_page_element_value'>
                            {user.userInformation?.email}
                            <button>Изменить</button>
                        </div>
                        :
                        <div className='profile_page_element_value'>
                            <input type='text'/>
                            <button>Добавить</button>
                        </div>
                    }
                </div>
            </div>
            <div>
                <div>
                    <div>
                        Новый пароль
                    </div>
                    <div>
                        <input type='text'/>
                    </div>
                </div>
                <div>
                    <div>
                        Повторите пароль
                    </div>
                    <div>
                        <input type='text'/>
                    </div>
                </div>
                <button>Изменить</button>
            </div>
        </div>
    </div>
)
});

export default ProfilePage;