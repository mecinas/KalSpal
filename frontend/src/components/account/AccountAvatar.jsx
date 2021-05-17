import React, { useState, useEffect } from 'react'
import {useAuth0} from '@auth0/auth0-react'
import { Col, Image, Button } from 'react-bootstrap'
import { Pencil } from 'react-bootstrap-icons'

import '../../styles/account/AccountAvatar.css'

export default function UserAvatar(props) {
    const [source, setSource] = useState({ source: null })
    const { user } = useAuth0();

    const hiddenFileInput = React.useRef(null);
    const handleFileInputClick = e => {
        hiddenFileInput.current.click();
    }
    const handleFileInputChange = e => {
        const photoUploaded = e.target.files[0];
        const data = new FormData();
        data.append('avatar', photoUploaded)
        data.append('email', user.email)
        props.putAvatar(data, setSource, encodeImage)
    }

    function encodeImage(arrayBuffer) {
        let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer), function (p, c) { return p + String.fromCharCode(c) }, ''))
        let mimetype = "image/png"
        return "data:" + mimetype + ";base64," + b64encoded
    }

    useEffect(() => {
        props.getAvatar(setSource, encodeImage)
    }, [user])

    return (
        <Col className="account_avatar_col">
            <Image className="avatar_img" src={source} roundedCircle />
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
