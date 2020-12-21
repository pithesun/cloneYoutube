import React from 'react';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function StartHeader() {
    return (
        <div className="start">
            <button className="menubar">
                <FontAwesomeIcon icon= {faBars} />
            </button>
            <div className="logo">
                <a href="/">
                <FontAwesomeIcon icon= {faYoutube} size="2x" className="icon"/>
                    <h1>Jutube</h1>
                </a>
            </div>
        </div>
    )
}

export default StartHeader
