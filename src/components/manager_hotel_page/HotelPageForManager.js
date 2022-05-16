import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Context} from "../../index";

const HotelPageForManager = observer(() => {
    const {view} = useContext(Context);
    useEffect(() => {
        view.setIsView(false);
    })

    return (
        <div>
            <table>
                <tr>
                    <th>Имя</th>
                    <th>Количество звезд</th>
                    <th>Страна</th>
                    <th>Действия</th>
                </tr>
                <tr>
                    <td>ЙЦУ</td>
                    <td>2</td>
                    <td>фв</td>
                    <td>действия</td>
                </tr>
            </table>
        </div>
    )
});

export default HotelPageForManager;