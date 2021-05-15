import React from 'react'
import { connect } from "react-redux";
import { Card, Button, Accordion, Form, Row, Col, Container } from 'react-bootstrap'
import { BsHeart, BsChatSquare } from 'react-icons/bs'
import Map from './Map';
import { v4 as uuidv4 } from "uuid";

function Post(props) {

    return (
        <Card>
            <Card.Body>
            <Map height="400px" mapId={uuidv4()} activityUrl={process.env.PUBLIC_URL + "/placeholder-gpx.gpx"} />
                <Card.Title>{props.post.title}</Card.Title>
                <Card.Text>
                    {props.post.desc}
                </Card.Text>
            </Card.Body>
            <Accordion>
                <Card>
                    <Card.Header className="d-flex justify-content-between">
                        <Accordion.Toggle as={Button} variant="none" eventKey="0">
                            <BsChatSquare /> {props.post.comments.length}
                        </Accordion.Toggle>
                        <Button variant="none"><BsHeart /> {props.post.likes}</Button>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <div>
                            {props.post.comments.map((c, cidx) => (
                                <Card key={cidx}>
                                    <Card.Body>
                                        <Card.Title>{c.user}</Card.Title>
                                        {c.text}
                                    </Card.Body>
                                </Card>
                            ))}
                            <Form>
                                <Form.Group controlId="comment">
                                    <Form.Control as="textarea" rows={3} placeholder="Dodaj komentarz" />
                                </Form.Group>
                                <div className="d-flex justify-content-end">
                                    <Button variant="primary" type="submit">
                                        Skomentuj
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Accordion.Collapse>

                </Card>
            </Accordion>
        </Card>
    )
}


function mapStateToProps(state) {
    return state;
}

export default Post = connect(mapStateToProps)(Post);

