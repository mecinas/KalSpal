import React from 'react'
import { Image } from 'react-bootstrap'
import missing from "../resources/Missing_avatar.svg"

import "../styles/Avatar.css"

export default function Avatar(props) {
    return (
        <div className="avatar-cont">
            {props.sauce !== null ? <Image className="img" fluid src={props.sauce} roundedCircle /> : <Image className="img" fluid src={missing} roundedCircle />}
            
        </div>
    )
}
