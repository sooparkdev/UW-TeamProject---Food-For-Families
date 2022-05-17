// import React, { useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { Flex, Box } from '@chakra-ui/react'
import { useState } from "react";
import PopUp from './PopUp'


const seattle = {lat: 47.6062, lng: -122.3321}


const Map = ( { foodResourcesToDisplay } ) => {
  // console.log("got in")
  // console.log(foodResourcesToDisplay)

  const [isClicked, setIsClicked] = useState(false);
  const [selectedFoodResource, setSelectedFoodResource] = useState(null);

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

  const handleClickOnMarkers = (foodResource) => {
    setIsClicked(true);
    setSelectedFoodResource(foodResource);
  }

  // let popupToShow = 
  // return (
  //   <div class="marker-popup"> 
  //     <p> Type: {foodResource.food_resource_type} </p> 
  //     <p> Description: {foodResource.description} </p> 
  //     <p> Address : {foodResource.address} </p>
  //     <p> Phone Number : {foodResource.phone_number} </p>
  //     <p> Operating Hours : {foodResource.operating_hours} </p>
  //     <p> Distance : { foodResource.distance }</p>
  //   </div>
  // )

  let allMarkers;
  if(foodResourcesToDisplay.length !== 0) {
    allMarkers = foodResourcesToDisplay.map((foodResource) => {
      let coordinates = { lat: foodResource.latitude, lng: (-1 * foodResource.longitude) };
      // console.log(coordinates);
      return <Marker key = { foodResource._id } position={ coordinates } onClick={() => handleClickOnMarkers(foodResource)}  />;
    })
  }
  // console.log(allMarkers)



  return ( 
    <Flex
    position='relative'
    flexDirection='column'
    alignItems='center'
    h='100vh'
    w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        <GoogleMap 
        center={seattle}
        zoom={11}
        mapContainerStyle={{width: '95%', height: '100%', margin: 'auto'}}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}>
        {/* onLoad={(map) => setMap(map)} */}

        { allMarkers }
        </GoogleMap>
      </Box>
      {/* <Box
        position='absolute'
        left={0} 
        top={0}
        h='100%'
        w='50%'
        p={0}
        borderRadius='lg'
        // bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <Filterbar />
        <div> <span class="material-symbols-outlined"> chevron_left </span> </div>
      </Box> */}
      { isClicked && <Box 
        position='absolute' 
        left={60} 
        bottom={25}
        >
          <PopUp foodResource={selectedFoodResource}/>
      </Box> }
      { foodResourcesToDisplay === 0 && <Box
        position='absolute'
        >

        </Box>}
    </Flex>

  );
}


export default Map;