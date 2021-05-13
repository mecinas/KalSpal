import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { getUser } from '../redux/actions'
import { Card, Container, Image } from "react-bootstrap"
import { fetchAvatar } from '../scripts/script'

import placeholder from "../resources/placeholder-1.png"

function Account(props) {
    useEffect(() => {
        if (props.accesstoken != undefined) {
            props.dispatch(getUser(props.accesstoken));
        }
    }, [props.accesstoken]);

    return (
        <Container>
            <Card >
                <Card.Header>
                    <Image src={placeholder} style={{ width: "128px", height: "128px" }} roundedCircle />
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        Twoje Informacje
                    </Card.Title>
                    <Card.Text>
                        {props.user === undefined ? <span></span> :
                            <span>
                                id: {props.user.id}<br />
                                Imię: {props.user.firstName}<br />
                                Nazwisko: {props.user.lastName}<br />
                                Adres e-mail: {props.user.email}<br />
                                Data urodzenia: {props.user.birthDate}<br />
                            </span>}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

function mapStateToProps(state) {
    return state;
}

export default Account = connect(mapStateToProps)(Account);