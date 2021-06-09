import { useEffect, useState, useRef } from "react"
import useScript from "../hooks/useScript";

export default function Map({ height, mapId, workout }) {

    const [map, setMap] = useState();
    const [gpx, setGpx] = useState();
    const [width, setWidth] = useState();

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
            if (gpx) {
                try {
                    map.fitBounds(gpx.getBounds());
                } catch (error) {
                    console.error(error);
                }
            }
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

        localMap.zoomControl.setPosition('bottomright');

        setMap(localMap);

        var baseMaps = {
            "OpenStreetMap": layers["osm"],
            "CyclOSM": layers["cyclosm"],
            "Mapbox Outdoors": layers["mapbox-outdoors"],
            "Mapbox Streets": layers["mapbox-streets"],
            "Mapbox Satellite": layers["mapbox-satellite"]
        };

        L.control.layers(baseMaps, null, {position: 'topleft'}).addTo(localMap);
        L.control.scale().addTo(localMap);

        if (workout.gpxUrl) {
            loadGPX(workout.gpxUrl, localMap);
        }
    }

    function loadGPX(path, map) {
        let newGpx = new L.GPX(path, {
            async: true,
            marker_options: {
                startIconUrl: process.env.PUBLIC_URL + '/leaflet/pin-icon-start.png',
                endIconUrl: process.env.PUBLIC_URL + '/leaflet/pin-icon-end.png',
                shadowUrl: process.env.PUBLIC_URL + '/leaflet/pin-shadow.png'
            }
        })

        newGpx.on('loaded', function (e) {
            map.fitBounds(e.target.getBounds());
        })
        newGpx.addTo(map);

        setGpx(newGpx);
    }

    function getDistance() {
        return Math.round(gpx.get_distance() / 10) / 100
    }


    function getTime() {
        return new Date(gpx.get_total_time())
            .toISOString()
            .slice(11, -1)
            .split(".")[0]
    }

    function getAverageSpeed() {
        const kms = gpx.get_distance() / 1000;
        const hours = gpx.get_total_time() / (1000 * 60 * 60);
        return Math.round(kms / hours * 100) / 100;
    }

    function round(number, places) {
        const p = Math.pow(10, places);
        return Math.round(number * p) / p;
    }


    return (
        <div>
            <div id={"map-" + mapId} ref={ref} style={{ height: height }}></div>
            {
                gpx &&
                <ul className="list-group list-group-horizontal mb-3 d-flex">
                    <li className="list-group-item flex-fill">Dystans: {round(workout.workoutStats.totalDistance, 2)} km</li>
                    <li className="list-group-item flex-fill">Czas: {workout.workoutStats.timeString}</li>
                    <li className="list-group-item flex-fill">Średnia prędkość: {round(workout.workoutStats.averageSpeed, 2)} km/h</li>
                    <li className="list-group-item flex-fill">Spalone kalorie: {workout.workoutStats.caloriesBurnedEstimate}</li>
                </ul>
            }
        </div>
    )
}

Map.defaultProps = {
    height: "500px"
};