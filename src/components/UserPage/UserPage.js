import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import axios from "axios";
import EndPoint from "../const/EndPoint";
import {CircularProgress} from "react-cssfx-loading";

const UserPage = observer(() => {
    const {view} = useContext(Context);
    const [users, setUsers] = useState(null);
    useEffect(async () => {
        view.setIsView(false);
        const resUsers = await axios.get(`${EndPoint}api/user/index`);
        setUsers(resUsers.data);
    })
    return (
        <div>
            {users ? <table width='100%' style={{borderCollapse:'separate',borderSpacing:' 0 1em'}}>
                <tr>
                    <th>Идентификатор</th>
                    <th>email</th>
                    <th>Роль</th>
                    <th>Действия</th>
                </tr>
                {users.map(user => (
                    <tr key={user.id} width='100%' style={{ textAlign: 'center'}}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>action</td>
                    </tr>
                ))}
            </table> : <div className="spinner-container">
                <CircularProgress color='blue' style={{height:'200px', width:'200px', marginTop:'50px'}}/>
                </div>}

        </div>
    )

});

export default UserPage;