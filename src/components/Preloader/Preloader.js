import React from 'react'
import './Preloader.css'

const Preloader = (props) => {
    return (
        <div className={props.isLoading ? "preloader" : "preloader preloader_hidden"}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
