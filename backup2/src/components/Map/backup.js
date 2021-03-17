import React, {useState, useEffect} from "react";
import './backup.css'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";

const libraries = ['places']
const mapContainerStyle = {
    width: '100%',
    height: '100vh'
}
const options = {
    disableDefaultUI : true,
    zoomControl: true,
    scrollwheel: false // Dont scroll to zoom the map
}

const Backup = ({loc, data, onScriptLoad, changeLocation}) => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey : process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,    
    })

    // const [center, setCenter] = useState(()=>({lat:0, lng:0}))
    const [center, setCenter] = useState(loc)
    const [storesList, setStoresList] = useState(data)
    const [markers, setMarkers] = useState(()=>[])
    const [selected, setSelected] = useState(()=>null)

    useEffect(() => {
        setStoresList(data)
    }, [data])

    useEffect(() => {
        setCenter(loc)
    }, [loc])

    // console.log(center)

    //When USER marker is dragged
    const onMarkerDragEnd = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        changeLocation({lat, lng})
        onScriptLoad()  
    };

    //if Map doesn't load
    if (loadError) return "Error!! Check your connection";
    if (!isLoaded) return 'Loading...';

    return (
        <div className='map-container'>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={center}
                options={options}
                onLoad={onScriptLoad}
                // onCenterChange={onScriptLoad}
            >

                {
                    center.lat ? 
                    <Marker
                        position={center}
                        onDragEnd={(e) => onMarkerDragEnd(e)}
                        draggable={true}
                        onPositionChanged= {onScriptLoad} 

                        onClick={()=>{
                            onScriptLoad()
                        }}
                        
                        icon={{
                            url: `/user.svg`,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                            scaledSize: new window.google.maps.Size(35, 35),
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

                        icon={{
                            url: `/shop.svg`,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                            scaledSize: new window.google.maps.Size(30, 30), 
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
    )
}

export default Backup