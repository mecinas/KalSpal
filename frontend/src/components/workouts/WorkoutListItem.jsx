import { ListGroup } from 'react-bootstrap'
import { GrBike } from 'react-icons/gr'
import { FaRunning } from 'react-icons/fa'

export default function WorkoutListItem({ workout }) {

    function getIcon(type) {
        if (type === "ride") return <GrBike />;
        else if (type === "run") return <FaRunning />;
        else return "?";
    }

    return (
        <ListGroup.Item action href={`#${workout.id}`} className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{getIcon(workout.type)} {workout.name}</h5>
                <small>{workout.startTime.split(".")[0]}</small>
            </div>

        </ListGroup.Item>
    )
}