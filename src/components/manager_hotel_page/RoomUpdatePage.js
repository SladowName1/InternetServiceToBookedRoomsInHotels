import {useContext, useEffect} from "react";
import {Context} from "../../index";

const RoomUpdatePage = () => {

    const {view} = useContext(Context);
    useEffect(() => {
        view.setIsView(false);
    })
    return(
        <div>
            КОМНАТА ТРАЛИВАЛИ
        </div>
    )
}

export default RoomUpdatePage;