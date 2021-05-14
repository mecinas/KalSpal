import { useEffect } from "react"
import useScript from "../hooks/useScript";


export default function Map({ activityUrl, height, mapId }) {

    let map;
    const L = window.L;

    let status = useScript(
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.5.1/gpx.min.js"
    );

    useEffect(() => {
        if (status === "ready") {
            init();
        }
    }, [status]);

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
        new L.GPX(path, {
            async: true,
            marker_options: {
                startIconUrl: process.env.PUBLIC_URL + '/leaflet/pin-icon-start.png',
                endIconUrl: process.env.PUBLIC_URL + '/leaflet/pin-icon-end.png',
                shadowUrl: process.env.PUBLIC_URL + '/leaflet/pin-shadow.png'
            }
        }).on('loaded', function (e) {
            map.fitBounds(e.target.getBounds());
        }).addTo(map);
    }

    return (
        <div id={"map-" + mapId} style={{ height: height }}></div>
    )
}

Map.defaultProps = {
    height: "500px"
};