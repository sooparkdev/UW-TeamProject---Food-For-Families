// import React, { useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'


const seattle = {lat: 47.6062, lng: -122.3321}


const Map = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCP8jDHaqKXjO91zew5-X_mKvc-1v-BW78",
  })

  if (!isLoaded) {
    return <div> Loading.. </div>
  }

  if(loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  // return isLoaded ? renderMap() : <Spinner />

  return ( 
    <GoogleMap 
      center={seattle}
      zoom={13}
      mapContainerStyle={{width: '90%', height: '85%', margin: 'auto'}}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
      }}>
      {/* onLoad={(map) => setMap(map)} */}
        <Marker position={seattle} />

    </GoogleMap>
    

  );
}


export default Map;