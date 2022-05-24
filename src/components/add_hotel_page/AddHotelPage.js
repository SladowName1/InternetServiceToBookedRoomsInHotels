import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Image} from "cloudinary-react";
import Dropzone from "react-dropzone";
import axios from "axios";
import EndPoint from "../const/EndPoint";
import {useNavigate} from "react-router";

const AddHotelPage = observer(() => {
    const {view, user, indexHotel} = useContext(Context);
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [numberOfStar, setStar] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        view.setIsView(false);
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
                setPhoto(res.data.public_id);
            });
    };

    const submitHandle = () => {
        console.log('here')
        const data = {
            Country: country,
            Photo: photo,
            City: city,
            Street: street,
            Phone: phone,
            Email: email,
            UserId: user.User.id,
            Name: name,
            Description: description,
            CountOfStar: Number(numberOfStar),
        }

        axios.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${localStorage.getItem("token")}`;
        axios.post( `${EndPoint}api/hotel/`, data)
            .then(res => {
                console.log(res);
                axios.get(`${EndPoint}api/hotel/getByUserId?id=${user.User.id}`)
                    .then(zxc => {
                        indexHotel.setManagerHotel(zxc.data.hotels);
                    })
                navigate('/managerHotel')
            }).catch(err => {
                console.log(err);
        })
    }

    return (
        <div className='add_hotel_page_container'>
            {photo ? <Image
                style={{margin:'auto'}}
                cloudName = "dz3dswxup"
                publicId = {photo}
                width='300px'
                height='300px'/> : <Dropzone onDrop={addMyVideo}>
                {({ getRootProps, getInputProps, isDragActive }) => (
                    <div {...getRootProps()} className="dropzone" style={{width:'45%', display:'flex', margin: 'auto'}}>
                        <input {...getInputProps()} />
                        {isDragActive
                            ? "Drop it like it's hot!"
                            : "Добавьте фото отеля нажатием или перетащите"}
                    </div>
                )}
            </Dropzone>}
            <div style={{width:'60%', display: 'flex', flexDirection:'column', margin:'auto'}}>
                <label style={{marginLeft:'2rem',marginTop:'1rem', fontSize:'18px'}}>Название</label><input value={name} onChange={(e) => setName(e.target.value)} type='text' required/><br/>
                <label style={{marginLeft:'2rem', fontSize:'18px'}}>Email</label><input value={email} onChange={(e) => setEmail(e.target.value)}  type='text' required/><br/>
                <label style={{marginLeft:'2rem', fontSize:'18px'}}>Номер телефона</label><input value={phone} onChange={(e) => setPhone(e.target.value)} type='text' required/><br/>
                <label style={{marginLeft:'2rem', fontSize:'18px'}}>Страна</label><input value={country} onChange={(e) => setCountry(e.target.value)} type='text' required/><br/>
                <label style={{marginLeft:'2rem', fontSize:'18px'}}>Город</label><input value={city} onChange={(e) => setCity(e.target.value)} type='text' required/><br/>
                <label style={{marginLeft:'2rem', fontSize:'18px'}}>Улица</label><input value={street} onChange={(e) => setStreet(e.target.value)}  type='text' required/><br/>
                <label style={{marginLeft:'2rem', fontSize:'18px'}}>Количество звезд</label><input value={numberOfStar} onChange={(e) => setStar(e.target.value)} type='number' required/><br/>
                <label style={{marginLeft:'2rem', fontSize:'18px'}}>Описание</label><input value={description} onChange={(e) => setDescription(e.target.value)} type='text' required/><br/>
                <button type="submit" name="submit" className="button-7" role="button" onClick={() => submitHandle()}>Добавить</button>
            </div>
        </div>
    )
});

export default AddHotelPage;