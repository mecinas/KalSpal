import React, { useState, useEffect } from 'react'
import { Col, Image, Button } from 'react-bootstrap'
import { Pencil } from 'react-bootstrap-icons'
import {connect} from 'react-redux'
import {addAvatar, getUser} from '../../redux/actions'

import '../../styles/account/AccountAvatar.css'
import placeholder from "../../resources/placeholder-1.png"

function AccountAvatar(props) {
    const [source, setSource] = useState({ source: null })

    const hiddenFileInput = React.useRef(null);
    const handleFileInputClick = e => {
        hiddenFileInput.current.click();
    }
    const handleFileInputChange = e => {
        const photoUploaded = e.target.files[0];
        const data = new FormData();
        data.append('file', photoUploaded)
        props.dispatch(addAvatar(props.accesstoken, data))
        setTimeout(() => {
            props.dispatch(getUser(props.accesstoken))
        }, 1000)
    }

    const getAvatar = () => {
        if(props.user !== undefined)
            if(props.user.avatarURL === null)
                setSource(placeholder)
            else
                setSource(props.user.avatarURL)
    }

    useEffect(() => {
        getAvatar()
    }, [props.user])

    return (
        <Col className="account_avatar_col">
            <Image className="avatar_img" src={source} />
            <Button className="pencil_ico" variant="light" onClick={handleFileInputClick}>
                <Pencil color="brown" size={20} />
                <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleFileInputChange}
                    name="myImage"
                    style={{ display: 'none' }} />
            </Button>
        </Col>
    )
}

function mapStoreToProps(state){
    return state
}

export default AccountAvatar = connect(mapStoreToProps)(AccountAvatar)


