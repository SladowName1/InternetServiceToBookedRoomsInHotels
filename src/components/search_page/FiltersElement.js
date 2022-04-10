import {useState} from "react";

const FiltersElement = () => {
    const [isShow, setShow] = useState(false);

    return(
        <div>
            <div style={{cursor:"pointer"}} onClick={() => setShow(!isShow)}>
                LAST EDIT
            </div>
            <div style={isShow ? {display:"block"}: {display:"none"}}>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
            </div>
        </div>
    )
}

export default FiltersElement;