import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { Row, Col, Container, Button, Card } from 'react-bootstrap'
import Post from './Post'
import Avatar from './Avatar'
import { getUserById, getUserPosts, getUser, addFriend, getFriends } from '../redux/actions'

import placeholder from "../resources/placeholder-1.png"

function User(props) {

    useEffect(() => {
        let user = props.match.params.userid;
        if (props.accesstoken !== undefined) {
            props.dispatch(getUser(props.accesstoken));
            props.dispatch(getUserById(props.accesstoken, user));
            props.dispatch(getUserPosts(props.accesstoken, user));
            props.dispatch(getFriends(props.accesstoken));
        }
    }, [props.accesstoken]);

    function isFriend() {
        return props.friends.findIndex(e => e.id === props.selecteduser.id) != -1;
    }

    function isMe() {
        if(!props.selecteduser || !props.user) {
            return false;
        }
        return props.selecteduser.id === props.user.id;
    }

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col xl={3}>
                    <Card>
                        <Card.Header>Podsumowanie</Card.Header>
                        <Card.Body className="px-2 pt-4">
                            {props.selecteduser &&
                                <>
                                    <div className="row justify-content-center">
                                        <div className="col-8">
                                            <Avatar sauce={props.selecteduser.avatarURL} /> <br />
                                        </div>
                                    </div>

                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Imię i nazwisko</th>
                                                <td>{props.selecteduser.firstName} {props.selecteduser.lastName}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Data urodzenia</th>
                                                <td>{props.selecteduser.birthDate}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Email</th>
                                                <td>{props.selecteduser.email}</td>
                                            </tr>
                                            <tr>
                                                <th colSpan="2">
                                                    {
                                                        !isMe() && (isFriend() ? (
                                                            <Button className="mt-2" variant="primary" disabled>Jesteście znajomymi</Button>
                                                        ) : (
                                                            <Button 
                                                                className="mt-2"
                                                                variant="primary"
                                                                onClick={(e) => props.dispatch(addFriend(props.accesstoken, props.selecteduser.id))}//Nie zmieniać!
                                                            >Zaproś do znajomych</Button>
                                                        ))

                                                    }
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </>
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
            </Row>
        </Container>
    )
}


function mapStateToProps(state) {
    return state;
}

export default User = connect(mapStateToProps)(User);
