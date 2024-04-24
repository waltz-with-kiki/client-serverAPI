import React from "react";

const MyInput = ({children, ...props}) =>{

    return(
        <div>
            <span>{children}</span>
            <input {...props}></input>
        </div>
    );
}

export default MyInput;