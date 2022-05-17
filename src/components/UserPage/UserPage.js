import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";

const UserPage = observer(() => {
    const {view} = useContext(Context);
    const [users, setUsers] = useState(null);
    useEffect(() => {
        view.setIsView(false);
    })
    return (
        <div>
            <table>
                <tr>
                    <th>Идентификатор</th>
                    <th>email</th>
                    <th>Роль</th>
                    <th>Действия</th>
                </tr>
                <tr>
                </tr>
            </table>
        </div>
    )

});

export default UserPage;