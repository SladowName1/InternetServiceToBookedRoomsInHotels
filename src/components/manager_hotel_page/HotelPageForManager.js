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
            <table width='100%' style={{borderCollapse:'separate',borderSpacing:' 0 1em'}}>
                <tr>
                    <th>Имя</th>
                    <th>Количество звезд</th>
                    <th>Страна</th>
                    <th>Действия</th>
                </tr>
                <tr width='100%' style={{ textAlign: 'center'}}>
                    <td>Test</td>
                    <td>3</td>
                    <td>Belarus</td>
                    <td>action</td>
                </tr>
            </table>
        </div>
    )
});

export default HotelPageForManager;