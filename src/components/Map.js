// import React, { useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { Flex, Box } from '@chakra-ui/react'
import { useState } from "react";
import PopUp from './PopUp';
import mapStyles from './mapStyles';


const seattle = {lat: 47.6062, lng: -122.3321}


const Map = ( { foodResourcesToDisplay, searchClickedAtLeastOnce, setMarkerIsClicked, markerIsClicked, schoolToDisplay } ) => {
  // console.log("got in")
  console.log(foodResourcesToDisplay)
  console.log(schoolToDisplay)

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

  const handleClickOnMap = () => {
    console.log("ASDFADSFADSFASD")
  }

  const handleClickOnMarkers = (foodResource) => {
    setMarkerIsClicked(true);
    setSelectedFoodResource(foodResource);
  }

  let allFoodResourceMarkers;
  if(foodResourcesToDisplay.length !== 0) {
    allFoodResourceMarkers = foodResourcesToDisplay.map((foodResource) => {
      let coordinates = { lat: foodResource.latitude, lng: (-1 * foodResource.longitude) };
      // console.log(coordinates);
      return <Marker key = { foodResource._id } position={ coordinates } onClick={() => handleClickOnMarkers(foodResource)} icon={{url: 'https://img.icons8.com/stickers/100/000000/ingredients.png', scaledSize: new window.google.maps.Size(30,30)}} />;
    })
  }

  let schoolMarker;
  if(foodResourcesToDisplay.length !== 0) {
    let coordinate = { lat: schoolToDisplay.latitude, lng: (-1 * schoolToDisplay.longitude) } 
    schoolMarker = <Marker key = { schoolToDisplay._id } position={ coordinate } title={schoolToDisplay.name} icon={{url: 'https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-school-elearning-and-education-justicon-lineal-color-justicon.png', scaledSize: new window.google.maps.Size(37,37)}} />;
  }


  // console.log(allFoodResourceMarkers)

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
        zoom={12}
        mapContainerStyle={{width: '95%', height: '100%', margin: 'auto'}}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: mapStyles,
        }}
        onClick={() => handleClickOnMap()}
        onDrag={() => handleClickOnMap()} >
        {/* onLoad={(map) => setMap(map)} */}

        { allFoodResourceMarkers }
        { schoolMarker }
        </GoogleMap>
      </Box>
      { searchClickedAtLeastOnce === true && foodResourcesToDisplay.length === 0 && 
        <Box position='absolute' width={'100%'} height={'100%'}> 
          <div id="no-matching-alert"> No matching results </div> 
        </Box>}

      { markerIsClicked && 
        <Box position='absolute' left={'4.5%'} bottom={25}>
          <PopUp foodResource={selectedFoodResource}/>
        </Box> }

    </Flex>
  );
}


export default Map;