import React, { Children } from "react";
import "./MyModal.css";

const MyModal = ({active, setActive, children, width, height}) =>{

    const modalStyle = {
        width: width || "400px", 
        height: height || "400px", 
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "white",
      };

    return(
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}



export default MyModal;