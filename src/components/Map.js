// import React, { useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'


const seattle = {lat: 47.6062, lng: -122.3321}


const Map = ( { foodResourcesToDisplay } ) => {
  // console.log("got in")
  console.log(foodResourcesToDisplay)
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCP8jDHaqKXjO91zew5-X_mKvc-1v-BW78",
  })

  if (!isLoaded) {
    return <div> Loading.. </div>
  }

  if(loadError) {
    return <div> Map cannot be loaded right now, sorry.</div>
  }

  // return isLoaded ? renderMap() : <Spinner />

  let allMarkers;
  if(foodResourcesToDisplay.length !== 0) {
    allMarkers = foodResourcesToDisplay.map((foodResource) => {
      let coordinates = { lat: foodResource.latitude, lng: (-1 * foodResource.longitude) };
      // console.log(coordinates);
      return <Marker key = {foodResource._id} position={ coordinates } icon={"school-try.png"} />;
    })
  }
  // console.log(allMarkers)

  let addCoord ={lat: 47.609657, lng: -122.342148}; //******INCLUDING THE FUCKING MINUS!!!!!!! */

  return ( 
    <GoogleMap 
      center={seattle}
      zoom={11}
      mapContainerStyle={{width: '90%', height: '85%', margin: 'auto'}}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
      }}>
      {/* onLoad={(map) => setMap(map)} */}

      { allMarkers }
    </GoogleMap>
    

  );
}


export default Map;