import React, { useEffect } from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import {useAuth0} from '@auth0/auth0-react'
import {useHistory} from 'react-router-dom'
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

    const { user } = useAuth0();
    let history = useHistory();

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

    const getInfo = (setUserInfo) => {
        // var url = "https://app-kalspal-dev.azurewebsites.net/getInfo"
        // if (user !== undefined) {
        //     axios.get(url, {
        //         params: {
        //             email: user.email
        //         }
        //     })
        //         .then(resp => {
        //             setUserInfo(resp.data)
        //         })
        // }
        var info = {
            firstname: "Paweł",
            surname: "Zawadzki",
            dateOfBirth: "2020-10-30",
            email: "zawadzki@pw.edu.pl"
        }
        setUserInfo(info)
    }

    return (
        <Container className="account_container">
            <Row>
                <UserAvatar getAvatar={getAvatar} putAvatar={putAvatar} />
            </Row>
            <Row>
                <UserInfoTable getInfo={getInfo} deleteUser={deleteUser} />
            </Row>
        </Container>
    )
}

function mapStateToProps(state) {
    return state;
}

export default Account = connect(mapStateToProps)(Account);