import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Context} from "../../index";

const HotelUpdatePage = observer(() => {
    const {view} = useContext(Context);
    useEffect(() => {
        view.setIsView(false);
    })
    return (
        <div>
            Hotel TUT BUDET
            <table>
                <tr>
                    <th>Номер</th>
                    <th>Название</th>
                    <th>Тип</th>
                    <th>Цена</th>
                    <th>Действия</th>
                </tr>
            </table>
        </div>
    )
});

export default HotelUpdatePage;