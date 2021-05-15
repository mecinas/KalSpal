import { useEffect, useState } from "react"
import useScript from "../hooks/useScript";


export default function Map({ activityUrl, height, mapId }) {

    let map;
    const L = window.L;

    const [gpx, setGpx] = useState();

    let status = useScript(
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.5.1/gpx.min.js"
    );

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
            "mapbox": L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
                {
                    id: 'mapbox/outdoors-v11',
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
                })
        }

        map = L.map("map-" + mapId, {
            center: [52.250036800, 21.0136778263],
            zoom: 12,
            layers: [layers["osm"]],
        });

        var baseMaps = {
            "OpenStreetMap": layers["osm"],
            "CyclOSM": layers["cyclosm"],
            "Mapbox": layers["mapbox"]
        };

        L.control.layers(baseMaps).addTo(map);
        L.control.scale().addTo(map);

        if (activityUrl) {
            loadGPX(activityUrl);
        }
    }

    function loadGPX(path) {
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

    return (
        <>
            <div id={"map-" + mapId} style={{ height: height }}></div>
            {
                gpx &&
                <ul className="list-group list-group-horizontal mb-3 d-flex">
                    <li className="list-group-item flex-fill">Dystans: {Math.round(gpx.get_distance() / 10) / 100} km</li>
                    <li className="list-group-item flex-fill">Czas: TODO</li>
                    <li className="list-group-item flex-fill">Średnia prędkość: TODO</li>
                </ul>
            }

        </>
    )
}

Map.defaultProps = {
    height: "500px"
};