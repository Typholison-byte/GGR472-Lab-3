mapboxgl.accessToken = 'pk.eyJ1IjoibGFrZWVyaWUiLCJhIjoiY201cG5nbmptMDM0eDJxb215YXB0OGV0ZSJ9.yGNd3OQ2HqXdTSTuJcD9ug'; // Add default public map token from your Mapbox account 

const map = new mapboxgl.Map({
    container: 'my-map', // map container ID 
    style: 'mapbox://styles/mapbox/streets-v12', // style URL 
    center: [-79.3, 43.68], // starting position [lng, lat] 
    zoom: 9, // starting zoom level
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
// Add geolocate control to the map.
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true }, // uses the most accuarate location available form user's device
    trackUserLocation: true //Shows users location on map (with permission from user)
}));

map.on('load', () => {
    // Add a data source from a GeoJSON file 
    map.addSource('GO-Stations', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/Typholison-byte/GGR472-Lab-3/refs/heads/main/Data/GO%20Stations.geojson' // Your URL to your buildings.geojson file 
    });

    // Add the layer to display the stations
    map.addLayer({
        'id': 'GO-Stations-layer',
        'type': 'circle',
        'source': 'GO-Stations',
        'paint': {
            'circle-radius': 6,
            'circle-color': 'green',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        }
    });

    // Pop-ups for GO Stations
    map.on('click', 'GO-Stations-layer', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<b>Station:</b> ${e.features[0].properties.name}`)
            .addTo(map);
    });

    // Add a data source from a GeoJSON file
    map.addSource('GGR472_Subway_Lines', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/Typholison-byte/GGR472-Lab-2-Attempt--2/refs/heads/main/Data/GGR472_Subway_Lines.geojson' // Your URL to your buildings.geojson file 
    });

    // Adding layer for subway lines
    map.addLayer({
        id: 'Subway-Lines-layer',
        type: 'line',
        source: 'GGR472_Subway_Lines',
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': 'turquoise',
            'line-width': 3,
            'line-opacity': 0.8
        }
    });

    // Pop-ups for Subway Lines
    map.on('click', 'Subway-Lines-layer', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<b>Subway Line:</b> ${e.features[0].properties.name}`)
            .addTo(map);
    });

    // Toggle layers button
    document.getElementById('toggle-subway').addEventListener('click', () => {
        const visibility = map.getLayoutProperty('Subway-Lines-layer', 'visibility');
        map.setLayoutProperty('Subway-Lines-layer', 'visibility', visibility === 'visible' ? 'none' : 'visible');
    });


    // Add a data source from a GeoJSON file
    map.addSource('Airports', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/Typholison-byte/GGR472-Lab-2-Attempt--2/refs/heads/main/Data/airports.geojson' // URL to your airports.geojson file 
    });

    // Adding layer for airports
    map.addLayer({
        id: 'Airports-layer', // Unique layer ID
        type: 'fill',  // Must be 'fill' for polygons
        source: 'Airports', // Corrected source ID
        paint: {
            'fill-color': 'purple',
            'fill-opacity': 0.5, // Adjusted opacity for visibility
            'fill-outline-color': '#000000' // Black outline for contrast
        }
    });

    // Pop-ups for Airports
    map.on('click', 'Airports-layer', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<b>Airport:</b> ${e.features[0].properties.name}`)
            .addTo(map);
    });

});
