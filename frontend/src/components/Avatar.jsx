import React from 'react'
import { Image } from 'react-bootstrap'

import "../styles/Avatar.css"

export default function Avatar(props) {
    return (
        <div className="avatar-cont">
            <Image className="img" fluid src={props.sauce} roundedCircle />
        </div>
    )
}
