import { useEffect } from 'react'
import { connect } from "react-redux";
import { ListGroup, Row, Col, Tab, Container } from 'react-bootstrap'
import { getWorkouts } from '../../redux/actions'
import WorkoutListItem from './WorkoutListItem';
import Workout from './Workout';

function Workouts(props) {
    useEffect(() => {
        if (props.accesstoken !== undefined) {
            props.dispatch(getWorkouts(props.accesstoken));
        }
    }, [props.accesstoken]);

    return (
        <Container fluid>
            <Tab.Container>
                <Row>
                    <Col className="col-4">
                        <ListGroup>
                            {props.workouts.map((workout, idx) => (
                                <WorkoutListItem key={idx} workout={workout} />
                            ))}
                        </ListGroup>
                    </Col>
                    <Col >
                        <Tab.Content>
                            {props.workouts.map((workout, idx) => (
                                <Tab.Pane key={idx} eventKey={`#${workout.id}`}>
                                    <Workout workout={workout} />
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
