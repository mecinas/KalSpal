import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { getUser } from '../../redux/actions'
import { Container, Row } from "react-bootstrap"
import { fetchAvatar } from '../../scripts/script'

import placeholder from "../../resources/placeholder-1.png"

import '../../styles/account/Account.css';

import UserInfoTable from './AccountInfoTable'
import UserAvatar from './AccountAvatar'

function Account(props) {

    useEffect(() => {
        if (props.accesstoken != undefined) {
            props.dispatch(getUser(props.accesstoken));
        }
    }, [props.accesstoken]);

    const putAvatar = (data, setSource, encodeImage) => {
        // var url = "https://app-kalspal-dev.azurewebsites.net/avatar"
        // axios.put(url, data, {
        //     headers: {
        //         'accept': 'application/json',
        //         'Accept-Language': 'en-US,en;q=0.8',
        //         'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        //     }
        // })
        //     .then(response => {
        //         console.log(response)
        //     })
        //     .catch(error => {
        //         console.log(error.message)
        //     })
        // setTimeout(() => {
        //     getAvatar(setSource, encodeImage)
        // }, 2000);
    }

    const getAvatar = (setSource, encodeImage) => {
        // const time = new Date().getTime(); //To make sure that request will execute despite cache photo memory
        // var url = "https://app-kalspal-dev.azurewebsites.net/avatar"
        // if (user !== undefined) {
        //     axios.get(url, {
        //         responseType: 'arraybuffer',
        //         params: {
        //             email: user.email,
        //             t: time
        //         }
        //     })
        //         .then(response => {
        //             setSource(encodeImage(response.data))
        //         })
        //         .catch(error => {
        //             console.log(error.message)
        //         })
        // }
        setSource(placeholder)
    }

    const deleteUser = () => {
        // var url = "https://app-kalspal-dev.azurewebsites.net/register"
        // axios.delete(url, { data: { email: user.email } })
        //     .then(response => {
        //     })
        //     .catch(error => {
        //         console.log(error.message)
        //     })
        // history.push("/")
    }

    return (
        <Container className="account_container">
            <Row>
                <UserAvatar getAvatar={getAvatar} putAvatar={putAvatar} />
            </Row>
            <Row>
                {props.user &&
                    <UserInfoTable deleteUser={deleteUser} user={props.user} />
                }
            </Row>
        </Container>
    )
}

function mapStateToProps(state) {
    return state;
}

export default Account = connect(mapStateToProps)(Account);