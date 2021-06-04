import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { Row, Col, Container, Button, Card } from 'react-bootstrap'
import Post from './Post'
import Avatar from './Avatar'
import { getUserById, getUserPosts, getUser, addFriend } from '../redux/actions'

import placeholder from "../resources/placeholder-1.png"

function User(props) {

    useEffect(() => {
        let user = props.match.params.userid;
        if (props.accesstoken !== undefined) {
            props.dispatch(getUser(props.accesstoken));
            props.dispatch(getUserById(props.accesstoken, user));
            props.dispatch(getUserPosts(props.accesstoken, user));
        }
    }, [props.accesstoken]);

    return (
        <Container fluid>
            <Row>
                <Col xl={3}>
                    <Card>
                        <Card.Header>Podsumowanie</Card.Header>
                        <Card.Body>
                            {props.selecteduser &&
                                <Card>

                                    <Card.Header>
                                        <Avatar sauce={props.selecteduser.avatarURL} /> <br />
                                        Imię i nazwisko: {props.selecteduser.firstName} {props.selecteduser.lastName} <br />
                                        Data urodzenia: {props.selecteduser.birthDate} <br />
                                        Email: {props.selecteduser.email}
                                    </Card.Header>

                                    <Button
                                        variant="primary"
                                        onClick={props.dispatch(addFriend(props.accesstoken, props.selecteduser.id))}
                                    >Dodaj do znajomych</Button>
                                </Card>
                            }
                        </Card.Body>
                    </Card>

                </Col >
                <Col xl={6}>
                    <Card>
                        <Card.Header>Tablica</Card.Header>
                        <Card.Body >
                            <div >
                                {props.posts.map((e, idx) => (
                                    <div key={idx} className="mb-3">
                                        <Post post={e} home={false}></Post>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3}>
                    <Card>
                        <Card.Header>Aktywności</Card.Header>
                        <Card.Body>
                            TBD
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}


function mapStateToProps(state) {
    return state;
}

export default User = connect(mapStateToProps)(User);
