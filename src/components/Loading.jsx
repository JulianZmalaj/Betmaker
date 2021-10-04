import React from 'react'
import './Loading.scss'
import logo from '../images/logo.svg'
import "animate.css"
function Loading() {
    return (
        <div className="main">
            <div className="div-loading">
                <img className="animate__animated animate__zoomInDown" style={{ animationDuration: "0.7s" }} src={logo} alt="" />
                <div className="loading"></div>
            </div>
        </div>
    )
}

export default Loading
