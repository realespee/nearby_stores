import React, {useEffect, useState} from "react";
import location from './user_location'
import './map.css'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";

const libraries = ['places']
const mapContainerStyle = {
    width: '60vw',
    height: '60vh'
}
const options = {
    disableDefaultUI : true,
    zoomControl: true,
    scrollwheel: false // Dont scroll to zoom the map
}
const data = []

const Map = () => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey : process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,    
    })

    const [center, setCenter] = useState(location)
    const [store, setStore] = useState(() => [])
    const [markers, setMarkers] = useState(() => [])
    const [selected, setSelected] = useState(() => null)
   
    const onScriptLoad = () => {
        let request = {
            location: center,
            radius : 10 * 1000, // delete if you are using "rankBy : DISTANCE"
            types: ['hardware_store', 'electronics_store', 'furniture_store', 'plumber',
            'painter', 'roofings_contractor'
            ]
        };

        var service = new window.google.maps.places.PlacesService(document.getElementById('map'))

        service.nearbySearch(request, function(results, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setStore(results) 
                for (var i = 0; i < results.length; i++) {
                    setMarkers([results[i]])
                    data.push(results[i]) 
                                 
                }
                // data.push(results)
                console.log(data)
                console.log(store)
            }
        })
    }


    //When marker is dragged
    const onMarkerDragEnd = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setCenter({lat, lng})
        // setMarkers([])
        // onScriptLoad()
    };

//    const onScriptLoaded = useEffect(onScriptLoad, [center])

    //if Map doesn't load
    if (loadError) return "Error!! Check your connection";
    if (!isLoaded) return 'Loading...';

    return (
        <div className='main'>
            <div className='container'>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={13.5}
                    center={center}
                    options={options}
                    onLoad={onScriptLoad}
                >

                    {
                        center.lat ? 
                        <Marker
                            position={center}
                            onDragEnd={(e) => 
                                {onMarkerDragEnd(e)
                                setMarkers([])
                                }
                            }
                            draggable={true} 
                            
                            icon={{
                                url: `/bear.svg`,
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15),
                                scaledSize: new window.google.maps.Size(30, 30),
                            }}
                        ></Marker> :
                        null
                    }

                    {data.map((d) => (
                        <Marker
                            key={d.place_id}
                            position={{
                                lat : d.geometry.location.lat(), 
                                lng : d.geometry.location.lng()
                            }}
                            onClick={()=>{
                                setSelected(d)
                            }}  
                        />
                    ))}

                    {selected && (
                        <InfoWindow
                            position={{
                                lat : selected.geometry.location.lat(), 
                                lng : selected.geometry.location.lng()
                            }}
                            onCloseClick={()=>{
                                setSelected(null)
                            }}
                        >
                            <div>
                                <h2>{selected.name}</h2>
                                <p>Location : {selected.vicinity}</p>
                                <p>Total Ratings : <strong>{selected.user_ratings_total}</strong></p>
                            </div>
                        </InfoWindow>
                    )} 

                </GoogleMap>
                <div id='map'></div>
            </div>

        </div>
    )
}

export default Map