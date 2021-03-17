const Location = () => {
    var location = {
        lat:0,
        lng: 0
    }

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            location.lat = position.coords.latitude
            location.lng = position.coords.longitude
        })
    }
    else{
        alert('Browser doesn\'t support Geolocation, such browsers last existed in the 20th century')
    }

    return location
}

export default Location
