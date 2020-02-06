export default function mapBox(coordinates) {    
    document.querySelector('.map').innerHTML = `<div id='map' style='width: 100%; height: 300px;'></div>`;

    mapboxgl.accessToken = 'pk.eyJ1IjoibW9za2tpciIsImEiOiJjazNoZTAwcTgwYXJiM2JxdDJra2R3NXViIn0.d4xMxIrtPiJpOMbMW3XXLw';

    coordinates = coordinates.split(',');
    const latitude = Number(coordinates[0]);
    const longitude = Number(coordinates[1]);

    const map = new mapboxgl.Map({
        style: 'mapbox://styles/mapbox/light-v10',
        center: [longitude, latitude],
        zoom: 10.5,
        pitch: 45,
        bearing: -17.6,
        container: 'map',
        antialias: true
    });

    map.on('load', function() {
        const {layers} = map.getStyle();
         
        let labelLayerId;
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                labelLayerId = layers[i].id;
                break;
            }
        }
         
        map.addLayer({
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                'fill-extrusion-color': '#aaa',
                'fill-extrusion-height': [
                        "interpolate", ["linear"], ["zoom"],
                        15, 0,
                        15.05, ["get", "height"]
                    ],
                'fill-extrusion-base': [
                    "interpolate", ["linear"], ["zoom"],
                    15, 0,
                    15.05, ["get", "min_height"]
                    ],
                'fill-extrusion-opacity': .6
            }
        }, labelLayerId);
    });
    
}