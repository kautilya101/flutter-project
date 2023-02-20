// mapboxgl.accessToken = 'pk.eyJ1Ijoia2F1dGlseWExMDEiLCJhIjoiY2xlY255bHhhMDA2ZzQzbno3M2N2eGtheiJ9.8Lq-s3jWtnJCw6jR0zH3dw';
// const map = new mapboxgl.Map({
//         container: 'map',
//         // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
//         style: 'mapbox://styles/mapbox/streets-v12',
//         center: [12.550343, 55.665957],
//         zoom: 8
// });

// const marker1 = new mapboxgl.Marker()
//     .setLngLat([12.554729, 55.70651])
//     .addTo(map);

 
const fetchdata = async () => {
    url = 'http://localhost:3200/v1/data'
    let data = await fetch(url);
    let response = await data.json()
    loadData(response)
}

async function loadData(data){
    data.map(async (item) => {
        location_search = item.locations;
        console.log(location_search);
        try{
        let api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location_search}.json?access_token=pk.eyJ1Ijoia2F1dGlseWExMDEiLCJhIjoiY2xlY255bHhhMDA2ZzQzbno3M2N2eGtheiJ9.8Lq-s3jWtnJCw6jR0zH3dw`
        let apiData = await fetch(api);
        let apiResponse = await apiData.json();
        
        item['long'] = apiResponse.features[0].geometry.coordinates[0];
        item['lat'] = apiResponse.features[0].geometry.coordinates[1];
        addMarker(data);
        }
        catch(err){
            console.log(`location not found - ${err}`)
        }
    });
    
}

mapboxgl.accessToken = 'pk.eyJ1Ijoia2F1dGlseWExMDEiLCJhIjoiY2xlY255bHhhMDA2ZzQzbno3M2N2eGtheiJ9.8Lq-s3jWtnJCw6jR0zH3dw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [50,37],
    zoom: 8
  });


function addMarker(response){
    response.map(item =>{
        const mark = document.createElement('div');
        mark.className = 'marker';
        new mapboxgl.Marker(mark)
        .setLngLat([item.long,item.lat])
        .setPopup(
            new mapboxgl.Popup({offset: 25})
            .setHTML(
                `<h3>${item.title}</h3><p>${item.locations}</p>`
            )
        )
        .addTo(map)
    })
    

}

fetchdata();