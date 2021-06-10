import { ListGroup } from 'react-bootstrap'
import { GrBike } from 'react-icons/gr'
import { FaRunning } from 'react-icons/fa'
import { ImBin } from 'react-icons/im'
import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import { connect } from 'react-redux'
import { deleteWorkout, getWorkouts } from '../../redux/actions'

function WorkoutListItem({ state, dispatch, workout }) {

    function getIcon(type) {
        if (type === "ride") return <GrBike />;
        else if (type === "run") return <FaRunning />;
        else return " ";
    }

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    function deleteThisWorkout() {
        dispatch(deleteWorkout(state.accesstoken, workout.id));

        setTimeout(() => {
            dispatch(getWorkouts(state.accesstoken));
        }, 1000)

        setShowDeleteModal(false);
    }

    return (
        <div>
            <ListGroup.Item action href={`#${workout.id}`} className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{getIcon(workout.type)} {workout.name}</h5>
                    <small>{workout.startTime.split(".")[0]} <ImBin color="red" size="20px" onClick={() => setShowDeleteModal(true)} /></small>
                </div>
            </ListGroup.Item>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Czy na pewno chcesz usunąć trening? </Modal.Title>
                </Modal.Header>
                <div>
                    <Modal.Body>
                        Trening '{workout.name}' zostanie bezpowrotnie usunięty.
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Anuluj</Button>
                        <Button variant="primary" onClick={deleteThisWorkout}>Tak</Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    )
}

function mapStateToProps(state, ownProps) {
    return { state: state, workout: ownProps.workout, rerender: ownProps.rerender };
}

export default WorkoutListItem = connect(mapStateToProps)(WorkoutListItem);