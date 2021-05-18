import { Card } from 'react-bootstrap'
import Map from '../Map';
import { v4 as uuidv4 } from "uuid";

export default function Workout({ workout }) {

    return (
        <Card>
            <Card.Body>
                <Card.Title>{workout.name}</Card.Title>
                <Map height="500px" mapId={uuidv4()} activityUrl={workout.gpxUrl} />

                <Card.Text>
                    TODO
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
