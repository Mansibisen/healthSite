
//let url = `https:${baseURL}/search/${versionNumber}/nearbySearch/.JSON?key=${apikey}&lat=<lat>&lon=<lon>&radius=${50}`//[&limit=<limit>][&ofs=<ofs>][&countrySet=<countrySet>][&topLeft=<topLeft>][&btmRight=<btmRight>][&language=<language>][&extendedPostalCodesFor=<extendedPostalCodesFor>][&categorySet=<categorySet>][&brandSet=<brandSet>][&connectorSet=<connectorSet>][&fuelSet=<fuelSet>][&view=<view>][&openingHours=<openingHours>][&timeZone=<timeZone>][&mapcodes=<mapcodes>][&relatedPois=<relatedPois>][&minPowerKW=<minPowerKW>][&maxPowerKW=<maxPowerKW>]`
window.addEventListener("load" ,() => {
    let lat;
    let long;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(result => {
            console.log(result)
            lat = result.coords.latitude
            long = result.coords.longitude
            console.log(lat,long)
            let baseURL = 'api.tomtom.com'
            const proxy = 'https://cors-anywhere.herokupp.com/'
            let versionNumber = 2
            let apikey = 'jG6JnITy4eipKm7Z2HOzwnGGL14ddDsW'
            let url = `https:${baseURL}/search/${versionNumber}/nearbySearch/.JSON?key=${apikey}&lat=${lat}&lon=${long}&radius=${50000}&limit=${50}`
            fetch(url)
            .then(Response => {
                return Response.json()
            })
            .then(data =>{
                document.getElementById('title').innerHTML="Here are some nearby healthcare centres!"

                //console.log("data",data);
                for (var i=0; i<data.results.length; i++){
                let adress=data.results[i].address.streetName;
                let category= data.results[i].poi.categories;
                console.log("data",adress);
                console.log("data",category);
                document.getElementById('data').innerText+=  "Category: "+category + " \n"+" Address: "+ adress +"\n\n";
                }   

            })
        })
       

    }else{
        console.log("change ur browser")
        
    }
}) 