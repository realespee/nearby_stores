import React, { useEffect, forwardRef, useImperativeHandle, useContext } from "react";
// import {firebaseAuth} from '.../Provider/AuthProvider'
import Sidebar from '../Sidebar/sidebar'
import Backup from '../Map/backup'
import './main.css'

const Main = forwardRef(({option}, ref)=> {

    // Location state, defaults to Kireka
    const [location, setLocation] = React.useState(
        {
             lat: 0, 
             lng: 0
        })
    const [opt, setOpt] = React.useState(option)
    const [stores, setStores] = React.useState(()=>[])

    // // Destructure Sign out
    // const {signout,} = useContext(firebaseAuth)
    

    useEffect(() => {
        setOpt(option)
    }, [option])

    // const types_of_stores = ['hardware_store', 'electronics_store', 'furniture_store', 'plumber',
    //         'painter', 'roofings_contractor'
    //         ]
    
    // Get User Location
    if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{ // watchPosition | getCurrentPosition
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            })
        }
    else{
            alert('Browser doesn\'t support Geolocation, such browsers last existed in the 20th century')
        }

    // Handle change location
    const handleChangeLocation = newLocation => setLocation(newLocation)

    // Callback to return the stores
    const onScriptLoad = () => { 
        let request = {
            location: location,
            // radius : 1 * 1000, // delete if you are using "rankBy : DISTANCE"
            rankBy : window.google.maps.places.RankBy.DISTANCE,
            types: [opt.value],
        };

        let data = [];

        var service = new window.google.maps.places.PlacesService(document.getElementById('map'))
        service.nearbySearch(request, function(results, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        
                for (var i = 0; i < results.length; i++) {
                    data.push(results[i])  
                }
                setStores(data)
            }
             
        })
    }


    // Imperative Handle : Moves state up to App.js
    useImperativeHandle(ref, () => {
        return {
        onScriptLoad : onScriptLoad
        };
    });

    return(
        <div className='main'>
            <div className='map-area'>
               <Backup onScriptLoad={onScriptLoad} data={stores} loc={location} changeLocation={handleChangeLocation}/> 
            </div>
            <div className='sidebar-area'>
                <Sidebar data={stores} />
            </div>
            
        </div>
    )
})

export default Main