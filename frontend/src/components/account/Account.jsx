import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { getUser } from '../../redux/actions'
import { Container, Row } from "react-bootstrap"

import '../../styles/account/Account.css';

import AccountInfoTable from './AccountInfoTable'
import AccountAvatar from './AccountAvatar'

function Account(props) {

    useEffect(() => {
        if (props.accesstoken !== undefined) {
            props.dispatch(getUser(props.accesstoken));
        }
    }, [props.accesstoken]);


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
                <AccountAvatar />
            </Row>
            <Row>
                {props.user &&
                    <AccountInfoTable deleteUser={deleteUser} user={props.user} />
                }
            </Row>
        </Container>
    )
}

function mapStateToProps(state) {
    return state;
}

export default Account = connect(mapStateToProps)(Account);