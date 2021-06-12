import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import {
    Row, Col, Container, ListGroup
    , Button, Card, Modal, Form
} from 'react-bootstrap'
import Post from './Post'
import Avatar from './Avatar'
import { BsTrophy, BsCalendar } from 'react-icons/bs'
import { GrBike } from 'react-icons/gr'
import { FaRunning } from 'react-icons/fa'
import { useHistory } from 'react-router-dom';
import { setSelectedFriend, getPosts, getUser, getFriends, postChallange, getWorkoutSummary } from '../redux/actions'

import placeholder from "../resources/placeholder-1.png"
import "../styles/Dashboard.css"

function Dashboard(props) {
    const [showChallange, setShowChallange] = useState(false);
    const [showMeeting, setShowMeeting] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (props.accesstoken !== undefined) {
            props.dispatch(getUser(props.accesstoken));
            props.dispatch(getPosts(props.accesstoken));
            props.dispatch(getFriends(props.accesstoken));
            props.dispatch(getWorkoutSummary(props.accesstoken));
        }
    }, [props.accesstoken]);

    function friendClicked(friend) {
        history.push(`/user/${friend}`)
    }

    function challangeClicked(friend) {
        props.dispatch(setSelectedFriend(friend))
        setShowChallange(true);
    }

    function challangeClosed() {
        setShowChallange(false);
    }

    function meetingClicked(friend) {
        props.dispatch(setSelectedFriend(friend))
        setShowMeeting(true);
    }

    function meetingClosed() {
        setShowMeeting(false);
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        var formData = new FormData(e.target)
        formData = Object.fromEntries(formData.entries())
        var content = formData.activity + ": " + formData.distance + "km w czasie poniżej " + formData.time +
            "min, termin zrealizowania wyzwania: " + formData.date.split("-").reverse().join("-")
        props.dispatch(postChallange(props.accesstoken, props.selectedfriend.id, content))
        challangeClosed()
    }

    function getIcon(type) {
        if (type === "ride") return <GrBike size={30}/>;
        else if (type === "run") return <FaRunning size={30}/>;
        else return " ";
    }

    return (
        <div>
            <Container fluid>
                <Row className="justify-content-center">
                    <Col xl={3}>
                        <Card>
                            <Card.Header>Znajomi</Card.Header>
                            <ListGroup variant="flush">
                                {props.friends.map((e, idx) => (
                                    <ListGroup.Item key={idx} className="container-fluid">
                                        <Row>
                                            <Col sm={2} className="pl-1 pr-1"><Avatar sauce={e.avatarURL} /></Col>
                                            <Col sm={8} className="d-flex justify-content-center align-self-center" onClick={() => friendClicked(e.id)}>{e.firstName} {e.lastName}</Col>
                                            <Col sm={2} className="d-flex justify-content-center"><Button variant="none" onClick={() => challangeClicked(e)}><BsTrophy /></Button></Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <Card.Header>Tablica</Card.Header>
                            <Card.Body >
                                <div >
                                    {props.posts.map((e, idx) => (
                                        <div key={idx} className="mb-3">
                                            <Post post={e} home={true}></Post>
                                        </div>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xl={3}>
                        <Card>
                            <Card.Header>Podsumowanie aktywności</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    {Object.keys(props.workoutSummary).map((e, idx) => (
                                        <ListGroup.Item key={idx} className="container-fluid">
                                            {getIcon(e)}<br />

                                            <table className="table my-2">
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">Przebyty dystans</th>
                                                        <td>{props.workoutSummary[e]["totalDistance"].toFixed(1)} km</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Czas</th>
                                                        <td>{props.workoutSummary[e]["timeString"]}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Średnia prędkość</th>
                                                        <td>{props.workoutSummary[e]["averageSpeed"].toFixed(1)} km/h</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Spalone kalorie</th>
                                                        <td>{props.workoutSummary[e]["caloriesBurnedEstimate"]}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>

            <Modal show={showChallange} onHide={challangeClosed} onSubmit={onFormSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Rzuć wyzwanie</Modal.Title>
                </Modal.Header>
                {props.selectedfriend === undefined ? <div></div> :
                    <div>
                        <Modal.Body>
                            <p>Czy chcesz rzucić wyzwanie użytkownikowi {props.selectedfriend.firstName} {props.selectedfriend.lastName}?</p>
                            <Form>
                                <Form.Group>
                                    <Form.Control required type="text" name="distance" placeholder="Podaj odległość w km"></Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control required type="text" name="time" placeholder="Podaj czas aktywności w minutach"></Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control
                                        as="select"
                                        className="my-1 mr-sm-2"
                                        id="inlineFormCustomSelectPref"
                                        custom
                                        name="activity"
                                    >
                                        <option required value="Rower">Wybierz aktywność</option>
                                        <option value="Bieganie">Bieganie</option>
                                        <option value="Rower">Rower</option>
                                        <option value="Kajak">Kajak</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                                        Podaj czas zakończenia wyzwania
                                    </Form.Label>
                                    <Form.Control required type="date" name="date" placeholder="Podaj odległość"></Form.Control>
                                </Form.Group>


                                <Modal.Footer>
                                    <Button variant="secondary" onClick={challangeClosed}>Zamknij</Button>
                                    <Button variant="primary" type="submit">Rzuć wyzwanie</Button>
                                </Modal.Footer>
                            </Form>
                        </Modal.Body>


                    </div>
                }
            </Modal>

            <Modal show={showMeeting} onHide={meetingClosed}>
                <Modal.Header closeButton>
                    <Modal.Title>Ustal wspólne spotkanie</Modal.Title>
                </Modal.Header>
                {props.selectedfriend === undefined ? <div></div> :
                    <div>
                        <Modal.Body>
                            <p>Czy chcesz ustalić wspólne spotkanie z użytkownikiem {props.selectedfriend.firstName} {props.selectedfriend.lastName}?.</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={meetingClosed}>Zamknij</Button>
                            <Button variant="primary">Ustal spotkanie</Button>
                        </Modal.Footer>
                    </div>
                }
            </Modal>
        </div>
    )
}
//<Col sm={2} className="d-flex justify-content-center"><Button variant="none" onClick={() => meetingClicked(e)} ><BsCalendar /></Button></Col>


function mapStateToProps(state) {
    return state;
}

export default Dashboard = connect(mapStateToProps)(Dashboard);
