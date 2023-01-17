import React from "react"

export default function BarIcon(props) {
    return (
        <button onClick={props.click} className={`navbar-icon ${props.classes}`}>
            {props.icon}
        </button>
    )
}