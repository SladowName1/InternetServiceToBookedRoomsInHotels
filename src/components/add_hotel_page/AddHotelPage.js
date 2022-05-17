import {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import Image from '../../img/img.png';
import Dropzone from "react-dropzone";
import axios from "axios";
import EndPoint from "../const/EndPoint";

const AddHotelPage = observer(() => {
    const {view, user} = useContext(Context);
    useEffect(() => {
        view.setIsView(false);
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
    return (
        <div className='add_hotel_page_container'>
            <Dropzone onDrop={addMyVideo}>
                {({ getRootProps, getInputProps, isDragActive }) => (
                    <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        {isDragActive
                            ? "Drop it like it's hot!"
                            : "Добавьте фото отеля нажатием или перетащите"}
                    </div>
                )}
            </Dropzone>
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