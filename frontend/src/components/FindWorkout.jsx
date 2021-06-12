import React, { useState, useEffect, useRef } from 'react'
import { connect } from "react-redux";
import { Col, Container, Row, Card, Form, Button } from "react-bootstrap"
import useScript from "../hooks/useScript";
import {getFindWorkout} from "../redux/actions"
import Map from './Map';
import { v4 as uuidv4 } from "uuid";

function FindWorkout(props) {
    const mapId = 1
    const height = "400px"
    const [map, setMap] = useState();
    const [width, setWidth] = useState();
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    const ref = useRef(null);
    const L = window.L;

    let status = useScript(
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.5.1/gpx.min.js"
    );

    useEffect(() => {
        setWidth(ref.current.clientHeight);
    })

    useEffect(() => {
        if (map) {
            map.invalidateSize()
        }
    }, [width])


    useEffect(() => {
        if (status === "ready") {
            removeMap();
            init();
        }
    }, [status]);

    function removeMap() {
        const container = L.DomUtil.get('map-' + mapId);
        if (container != null) {
            container._leaflet_id = null;
        }
    }

    function getMapboxMapLayer(id) {
        return L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
            {
                id: id,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
            })
    }

    function getMapboxMapLayer(id) {
        return L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
            {
                id: id,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
            })
    }

    function init() {
        const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

        const layers = {
            "osm": L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    id: 'osm',
                    attribution: attribution
                }),
            "cyclosm": L.tileLayer("https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
                {
                    id: 'cyclosm',
                    attribution: attribution
                }),
            "mapbox-outdoors": getMapboxMapLayer('mapbox/outdoors-v11'),
            "mapbox-streets": getMapboxMapLayer('mapbox/streets-v11'),
            "mapbox-satellite": getMapboxMapLayer('mapbox/satellite-v9')
        }

        let localMap = L.map("map-" + mapId, {
            center: [52.250036800, 21.0136778263],
            zoom: 12,
            layers: [layers["osm"]],
        });

        var marker;
        localMap.on('click', function (e) {
            if (marker)
                localMap.removeLayer(marker);
            marker = L.marker(e.latlng).addTo(localMap);
            setLat(e.latlng.lat)
            setLng(e.latlng.lng)

        });

        localMap.zoomControl.setPosition('bottomright');

        setMap(localMap);

        var baseMaps = {
            "OpenStreetMap": layers["osm"],
            "CyclOSM": layers["cyclosm"],
            "Mapbox Outdoors": layers["mapbox-outdoors"],
            "Mapbox Streets": layers["mapbox-streets"],
            "Mapbox Satellite": layers["mapbox-satellite"]
        };

        L.control.layers(baseMaps, null, { position: 'topleft' }).addTo(localMap);
        L.control.scale().addTo(localMap);

    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        if (lat === "" || lng === ""){
            alert("Proszę wybrać punkt początkowy")
            return
        }
        var formData = new FormData(e.target)
        formData = Object.fromEntries(formData.entries())
        props.dispatch(getFindWorkout(props.accesstoken, formData))
    }

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col xl={4}>
                    <Card>
                        <Card.Header>Wyszukaj trasę</Card.Header>
                        <Card.Body >
                            <Row className="m-3">Wybierz punkt początkowy:</Row>
                            <div>
                                <div id={"map-" + mapId} ref={ref} style={{ height: height }}></div>
                            </div>
                            <Form onSubmit={onFormSubmit}>
                                <Form.Group className="mx-3">
                                    <Form.Control type="hidden" name="latitude" value={lat} required></Form.Control>
                                    <Form.Control type="hidden" name="longitude" value={lng} required></Form.Control>
                                </Form.Group>
                                <Form.Group className="mx-3"> 
                                    <Form.Label>Dystans (w kilometrach):</Form.Label>
                                    <Form.Control type="text" name="distance" required></Form.Control>
                                </Form.Group >
                                <Form.Group className="mx-3">
                                    <Form.Label>Maksymalna odległość od wybranego startu (w kilometrach):</Form.Label>
                                    <Form.Control type="text" name="range" required></Form.Control>
                                </Form.Group>
                                <Button className="mx-3" variant="primary" type="submit">Znajdź trasę</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card>
                        <Card.Header>Najlepsza trasa</Card.Header>
                        <Card.Body>
                            {props.foundWorkout === undefined || props.foundWorkout.id === undefined ? <Row className="mx-3 mt-3">Tu pojawi się znaleziona trasa</Row>: <Map height="500px" mapId={uuidv4()} workout={props.foundWorkout}/>}
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

export default FindWorkout = connect(mapStateToProps)(FindWorkout);