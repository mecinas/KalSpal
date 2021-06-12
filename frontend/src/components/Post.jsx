import React, { useState } from 'react'
import { connect } from "react-redux";
import { Card, Button, Accordion, Form, Modal } from 'react-bootstrap'
import { BsHeart, BsChatSquare, BsHeartFill } from 'react-icons/bs'
import { GrBike } from 'react-icons/gr'
import { FaRunning } from 'react-icons/fa'
import { ImBin } from 'react-icons/im'
import Map from './Map';
import { v4 as uuidv4 } from "uuid";
import { updateReaction, submitComment, removeComment, getPosts, getUserPosts } from '../redux/actions'

function Post(props) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    function getIcon(type) {
        if (type === "ride") return <GrBike />;
        else if (type === "run") return <FaRunning />;
        else return " ";
    }

    function updatePostsAfterAction() {
        if (props.home) {
            console.log("a")
            setTimeout(() => {
                props.dispatch(getPosts(props.accesstoken));
            }, 1000)
        }
        else {
            console.log("b")
            setTimeout(() => {
                props.dispatch(getUserPosts(props.accesstoken, props.selecteduser));
            }, 1000)
        }
    }

    const onCommentSubmit = (e) => {
        e.preventDefault();
        var formData = new FormData(e.target)
        formData = Object.fromEntries(formData.entries())
        props.dispatch(submitComment(props.accesstoken, formData, props.post.id))
        updatePostsAfterAction();
    }


    function reactionClicked(postid) {
        props.dispatch(updateReaction(props.accesstoken, postid))
        updatePostsAfterAction();
    }

    function removeCommentClicked(commentid) {
        props.dispatch(removeComment(props.accesstoken, props.post.id, commentid))
        updatePostsAfterAction();
        setShowDeleteModal(false)
    }

    return (
        <Card className="m-3">
            <Card.Body>
                <Map height="500px" mapId={uuidv4()} workout={props.post}/>
                <Card.Title>{getIcon(props.post.type)} {props.post.name}</Card.Title>
                <Card.Text className="mx-3">
                {props.post.user.firstName} {props.post.user.lastName}
                </Card.Text>
            </Card.Body>
            <Accordion>
                <Card>
                    <Card.Header className="d-flex justify-content-between">
                        <Accordion.Toggle as={Button} variant="none" eventKey="0">
                            <BsChatSquare /> {props.comments[props.post.id] === undefined ? 0 : props.comments[props.post.id].length}
                        </Accordion.Toggle>
                        <Button variant="none" onClick={() => reactionClicked(props.post.id)}>{props.reactions[props.post.id] !== undefined && props.reactions[props.post.id].some(e => e.user.id === props.user.id) ? <BsHeartFill /> : <BsHeart />} {props.post.reactionsNumber}</Button>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <div>
                            {props.comments[props.post.id] === undefined ? <div></div> : props.comments[props.post.id].map((c, cidx) => (
                                <Card key={cidx} className="m-3 bg-light">
                                    <Card.Body>

                                        <Card.Title>
                                            <div className="row">
                                                <div className="col-10">
                                                    <small className="text-muted">{c.user.firstName} {c.user.lastName}</small>
                                                </div>
                                                <div className="col-2 text-right">
                                                    {props.user.id === c.user.id ? <ImBin color="red" size="20px" onClick={() => setShowDeleteModal(true)} /> : <div></div>}
                                                </div>
                                            </div>
                                        </Card.Title>
                                        <Card.Text className="mx-3">{c.text}</Card.Text>
                                    </Card.Body>

                                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Czy na pewno chcesz usunąć komentarz? </Modal.Title>
                                        </Modal.Header>
                                        <div>
                                            <Modal.Body>
                                                Komentarz zostanie bezpowrotnie usunięty.
                                            </Modal.Body>

                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Anuluj</Button>
                                                <Button variant="primary" onClick={() => removeCommentClicked(c.id)}>Tak</Button>
                                            </Modal.Footer>
                                        </div>
                                    </Modal>
                                </Card>

                            ))}
                            <Form onSubmit={onCommentSubmit} className="m-3">
                                <Form.Group controlId={props.post.id}>
                                    <Form.Control as="textarea" name="text" rows={3} placeholder="Dodaj komentarz" required />
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

