
const fetchdata = async () => {
    url = 'http://localhost:3200/v1/data'
    let data = await fetch(url);
    let response = await data.json()
    let locationObj = {}
    for(const item of response){
        if(item.locations in locationObj){
            locationObj[item.locations].push(item.title);
        }
        else{
            locationObj[item.locations] = [item.title]
        }
    }
    console.log(locationObj)
    loadData(locationObj);
}




mapboxgl.accessToken = 'pk.eyJ1Ijoia2F1dGlseWExMDEiLCJhIjoiY2xlY255bHhhMDA2ZzQzbno3M2N2eGtheiJ9.8Lq-s3jWtnJCw6jR0zH3dw';
const map = new mapboxgl.Map({
    container: 'map',
    // projection: 'naturalEarth',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [12.550343, 55.665957],
    zoom: 3
  });

async function loadData(data){

    for(let item in data){
        location_search = item;

    try{
        let api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location_search}.json?access_token=pk.eyJ1Ijoia2F1dGlseWExMDEiLCJhIjoiY2xlY255bHhhMDA2ZzQzbno3M2N2eGtheiJ9.8Lq-s3jWtnJCw6jR0zH3dw`
        let apiData = await fetch(api);
        let apiResponse = await apiData.json();
        let coordinates = {}
        coordinates['long'] = await Number(apiResponse.features[0].center[0]);
        coordinates['lat'] = await Number(apiResponse.features[0].center[1]);
        data[item].push(coordinates);

        // console.log(data[item][len-1])
        let html=`<h3>${item}</h3>`
            data[item].forEach((elem)=>{
            if(typeof elem == 'string')
                html += `<h4>${elem}</h4>`
        })
        const mark = document.createElement('div');
        mark.className = 'marker'; 
        const markList = document.createElement('div');
        markList.className = 'markList'
        let len = data[item].length
        new mapboxgl.Marker(markList)     
        .setLngLat([data[item][len-1].long,data[item][len-1].lat])
        .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(html)
        )
        .addTo(map)
        markList.appendChild(mark)
        }
    
    
    catch(err){
        console.log(`location not found - ${err}`)
    }
    }
}
    





function addMarker(response){
    for(let item in response){
        let len = response[item].length;
        const markList = document.createElement('div');
        markList.className = 'markList'
        const mark = document.createElement('div');
        mark.className = 'marker';

        markList.appendChild(mark);
        // try{
        new mapboxgl.Marker(markList)
        
        .setLngLat([response[item][len-1].long,response[item][len-1].lat])
        .setPopup(
            new mapboxgl.Popup({offset: 25})
            .setHTML(
                `<h3>${response[item]}</h3><p>${item}</p>`
            )
        )
        .addTo(map)
        // }
        // catch(err){
        //     console.log([response[item][len-1].long,response[item][len-1].lat],err)
        // }
       

    }
    

}

fetchdata();

