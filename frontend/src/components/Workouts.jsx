import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { ListGroup, Row, Col, Tab, Card, Container } from 'react-bootstrap'
import { getWorkouts } from '../redux/actions'

import placeholder from "../resources/placeholder-1.png"

function Workouts(props) {
    useEffect(() => {
        if (props.accesstoken != undefined) {
            props.dispatch(getWorkouts(props.accesstoken));
        }
    }, [props.accesstoken]);

    return (
        <Container>
            <Tab.Container>
                <Row>
                    <Col>
                        <ListGroup>
                            {props.workouts.map((e, idx) => (
                                <ListGroup.Item key={idx} action href={`#${e.id}`} variant="primary">{e.id}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col>
                        <Tab.Content>
                            {props.workouts.map((e, idx) => (
                                <Tab.Pane key={idx} eventKey={`#${e.id}`}>
                                    <Card>
                                        <Card.Img src={placeholder} style={{ width: "90%" }} />
                                        <Card.Body>
                                            <Card.Title>{e.id}</Card.Title>
                                            <Card.Text>
                                                statystyki
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}

function mapStateToProps(state) {
    return state;
}

export default Workouts = connect(mapStateToProps)(Workouts);
