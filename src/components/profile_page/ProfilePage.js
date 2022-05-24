import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import axios from "axios";
import EndPoint from "../const/EndPoint";
import Dropzone from "react-dropzone";
import {Image} from 'cloudinary-react';

const ProfilePage = observer(() => {
    const {user, view} = useContext(Context);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

    useEffect(async () => {
        console.log('here')
        view.setIsView(false);
        console.log(user.UserInformation?.photo)
        if (!user.UserInformation) {
            const res = await axios.get(`${EndPoint}api/user/userInfo?id=${user.User.id}`, {
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
        formData.append("upload_preset", "ms04yetu");

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

    const updateUSerInfo = () => {
        const data = {
            Name: name,
            LastName: lastName
        }
        axios.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${localStorage.getItem("token")}`;
        axios
            .post(
                `${EndPoint}api/user/updateUserInfo?id=${user.User.id}`, data
            )
            .then(async (res) => {
                const zxc = await axios.get(`${EndPoint}api/user/userInfo?id=${user.User.id}`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                if (zxc.data.userInfo) {
                    user.setUserInformation(zxc.data.userInfo)
                }
            });
    }

    const changeImage = (e) => {
        delete axios.defaults.headers.common["Authorization"];
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("upload_preset", "ms04yetu");

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
                    .then(async (res) => {
                        const zxc = await axios.get(`${EndPoint}api/user/userInfo?id=${user.User.id}`, {
                            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                        })
                        if (zxc.data.userInfo) {
                            user.setUserInformation(zxc.data.userInfo)
                        }
                    });
            });
    }

return(
    <div className='profile_page_container'>
        <div>
            {user.UserInformation?.photo ?
                <div>
                    <Image
                        cloudName = "dz3dswxup"
                        publicId = {user.UserInformation?.photo}
                    width='300'
                    height='300'/><br/>
                    <input type='file' onChange={(e) => changeImage(e)}/>
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
                   { user.UserInformation?.name ?
                       <div className='profile_page_element_value' style={{marginRight:'15rem', marginTop:'0.25rem', fontSize:'20px' }}>
                           {user.UserInformation?.name}
                       </div>
                       :
                       <div className='profile_page_element_value'>
                           <input value={name} onChange={(e) => setName(e.target.value)} type='text'/>
                           <button onClick={updateUSerInfo}>Добавить</button>
                       </div>
                   }
               </div>
           </div>
            <div className='profile_page_info_element_container'>
                <div className='profile_page_element_title'>
                    Фамилия:
                </div>
                <div className='profile_page_element_value'>
                    { user.UserInformation?.lastName ?
                        <div className='profile_page_element_value' style={{marginRight:'15rem', marginTop:'0.25rem', fontSize:'20px' }}>
                            {user.UserInformation?.lastName}
                        </div>
                        :
                        <div className='profile_page_element_value'>
                            <input value={lastName} onChange={(e) => setLastName(e.target.value)} type='text'/>
                            <button onClick={updateUSerInfo}>Добавить</button>
                        </div>
                    }
                </div>
            </div>
            <div className='profile_page_info_element_container'>
                <div className='profile_page_element_title'>
                    Email:
                </div>
                <div className='profile_page_element_value'>
                    { user.User?.email ?
                        <div className='profile_page_element_value' style={{marginRight:'15rem', marginTop:'0.25rem', fontSize:'20px' }}>
                            {user.User?.email}
                        </div>
                        :
                        <div className='profile_page_element_value'>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type='text'/>
                            <button onClick={updateUSerInfo}>Добавить</button>
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
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type='text'/>
                    </div>
                </div>
                <div className='profile_page_info_element_container'>
                    <div className='profile_page_element_title'>
                        Повторите пароль
                    </div>
                    <div className='profile_page_element_value'>
                        <input value={secondPassword} onChange={(e) => setSecondPassword(e.target.value)} type='text'/>
                    </div>
                </div>
                <button style={{marginLeft: 'auto', display: 'flex',height: '27px'}}>Изменить</button>
            </div>
        </div>
    </div>
)
});

export default ProfilePage;