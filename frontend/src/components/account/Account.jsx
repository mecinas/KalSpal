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

    return (
        <Container className="account_container">
            <Row>
                <AccountAvatar />
            </Row>
            <Row className="justify-content-center">
                {props.user &&
                    <AccountInfoTable user={props.user} />
                }
            </Row>
        </Container>
    )
}

function mapStateToProps(state) {
    return state;
}

export default Account = connect(mapStateToProps)(Account);