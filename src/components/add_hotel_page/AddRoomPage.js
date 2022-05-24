import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {Image} from "cloudinary-react";
import Dropzone from "react-dropzone";
import axios from "axios";
import EndPoint from "../const/EndPoint";

const AddRoomPage = observer(() => {
    const {view, rooms} = useContext(Context);
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [number, setNumber] = useState('');
    const [cost, setCost] = useState('');
    const [countOfPeople, setCountOfPeople] = useState('');
    const [wifi, setWifi] = useState(false);
    const [bar, setBar] = useState(false);
    const [see, setSee] = useState(false);
    const [jac, setJac] = useState(false);
    const [bath, setBath] = useState(false);
    const [countOfRoom, setCountOfRoom] = useState(1);

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

    const addRoom = () => {
        const data = {
            Photo: photo,
            Name: name,
            Description: description,
            RoomNumber: Number(number),
            CountOfPeople: Number(countOfPeople),
            Type: type,
            Cost: Number(cost),
            HotelId: rooms.HotelId,
            HasWifi: Number(wifi),
            HasBar: Number(bar),
            ViewOnSee: Number(see),
            HasJacuzzi: Number(jac),
            HasSecondBathroom: Number(bath),
        };


        axios.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${localStorage.getItem("token")}`;
        axios.post( `${EndPoint}api/room?countOfRoom=${countOfRoom}`, data)
            .then(res => {
                console.log(res);
            }).catch(err => {
            console.log(err);
        })
    }


    return (
        <div className='add_room_page_container'>
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
                <label style={{marginLeft:'2rem', fontSize:'18px'}}>Описание</label><input value={description} onChange={(e) => setDescription(e.target.value)}  type='text' required/><br/>
                <label style={{marginLeft:'2rem', fontSize:'18px'}}>Тип</label><input value={type} onChange={(e) => setType(e.target.value)} type='text' required/><br/>
                <label style={{marginLeft:'2rem', fontSize:'18px'}}>Номер комнаты</label><input value={number} onChange={(e) => setNumber(e.target.value)} type='number' required/><br/>
                <label style={{marginLeft:'2rem', fontSize:'18px'}}>Цена</label><input value={cost} onChange={(e) => setCost(e.target.value)} type='number' required/><br/>
                <label style={{marginLeft:'2rem', fontSize:'18px'}}>Количество людей</label><input value={countOfPeople} onChange={(e) => setCountOfPeople(e.target.value)}  type='number' required/><br/>
                <div>
                    <label style={{marginLeft:'2rem', fontSize:'18px', marginRight:'1rem'}}>Количество комнат</label>
                    <button style={{marginRight:'0.5rem', background:'#0095ff', border:'none', borderRadius:'3px', width:'20px', height:'20px'}} onClick={() => setCountOfRoom(countOfRoom + 1)}>+</button>{countOfRoom} <button onClick={() => setCountOfRoom(countOfRoom - 1)} style={{marginLeft:'0.5rem', background:'#0095ff', border:'none', borderRadius:'3px', width:'20px', height:'20px'}}>-</button>
                </div><br/>
                <div>
                    <div style={{display:'flex', alignItemss:'center'}}>
                        <input type='checkbox' style={{width:'2rem'}} onChange={() => setWifi(!wifi)}/> <label>Есть вайфай?</label>
                    </div>
                    <div style={{display:'flex', alignItemss:'center'}}>
                        <input type='checkbox' style={{width:'2rem'}} onChange={() => setBar(!bar)}/> <label>Есть бар?</label>
                    </div>
                    <div style={{display:'flex', alignItemss:'center'}}>
                        <input type='checkbox' style={{width:'2rem'}} onChange={() => setSee(!see)}/> <label>Вид на море?</label>
                    </div>
                    <div style={{display:'flex', alignItemss:'center'}}>
                        <input type='checkbox' style={{width:'2rem'}} onChange={() => setJac(!jac)}/> <label>Есть джакузи?</label>
                    </div>
                    <div style={{display:'flex', alignItemss:'center'}}>
                        <input type='checkbox' style={{width:'2rem'}} onChange={() => setBath(!bath)}/> <label>Есть вторая душевая?</label>
                    </div>
                </div>
                <button onClick={() => addRoom()} className="button-7">Добавить</button>
            </div>
        </div>
    )
});

export default AddRoomPage