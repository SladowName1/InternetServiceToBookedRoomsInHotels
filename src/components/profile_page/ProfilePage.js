import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Context} from "../../index";
import axios from "axios";
import EndPoint from "../const/EndPoint";
import Image from '../../img/img.png';
import Dropzone from "react-dropzone";

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
    const addMyVideo = (acceptedFiles) => {
        delete axios.defaults.headers.common["Authorization"];
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        formData.append("upload_preset", "");

        axios
            .post("https://api.cloudinary.com/v1_1/dz3dswxup/image/upload", formData)
            .then((res) => {
                console.log(res.data);
                axios.defaults.headers.common[
                    "Authorization"
                    ] = `Bearer ${localStorage.getItem("token")}`;
                axios
                    .post(
                        `${EndPoint}api/user/updateUserInfo?id=${user.User.id}`, {Photo: res.data.public_id}
                    )
                    .then((res) => {
                        alert(res.data.res);
                    });
            });
    };
return(
    <div className='profile_page_container'>
        <div>
            {user.userInformation?.photo ?
                <div>
                    <img src={Image.toString()}/> <br/>
                    <button>Изменить</button>  <button>Удалить</button>
                </div> :
                <div>
                    <Dropzone onDrop={addMyVideo}>
                        {({ getRootProps, getInputProps, isDragActive }) => (
                            <div {...getRootProps()} className="dropzone">
                                <input {...getInputProps()} />
                                {isDragActive
                                    ? "Drop it like it's hot!"
                                    : "Add photo u want click or drop"}
                            </div>
                        )}
                    </Dropzone>
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
                <div className='profile_page_info_element_container'>
                    <div className='profile_page_element_title'>
                        Новый пароль
                    </div>
                    <div className='profile_page_element_value'>
                        <input type='text'/>
                    </div>
                </div>
                <div className='profile_page_info_element_container'>
                    <div className='profile_page_element_title'>
                        Повторите пароль
                    </div>
                    <div className='profile_page_element_value'>
                        <input type='text'/>
                    </div>
                </div>
                <button style={{marginLeft: 'auto', display: 'flex',height: '27px'}}>Изменить</button>
            </div>
        </div>
    </div>
)
});

export default ProfilePage;