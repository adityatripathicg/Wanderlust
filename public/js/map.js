
        {/* /* // TO MAKE THE MAP APPEAR YOU MUST
        // ADD YOUR ACCESS TOKEN FROM
        // https://account.mapbox.com */ }
        let mapToken = mapToken;
        console.log(mapToken);
        mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
});

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({color : 'red'})
.setLngLat(coordinates) //Listing.geometry.coordinates
.setPopup(
    new mapboxgl.Popup({ offset : 25}).setHTML(
        "<h4>You'll be Living Here!</h4>"
    )
)
.addTo(map);    
