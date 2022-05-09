import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Context} from "../../index";
import axios from "axios";
import EndPoint from "../const/EndPoint";

const ProfilePage = observer(() => {
    const {user} = useContext(Context);

    useEffect(async () => {
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
    <div>
        FUck
    </div>
)
});

export default ProfilePage;