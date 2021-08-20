import React from "react";
import loaderSpinner from "../../../assets/images/Spinner.svg";

export let Preloader = (props) => {
    return (
        <div>
            <img src={loaderSpinner} alt='Preloader pic'/>
        </div>
    )
}