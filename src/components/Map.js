import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { Flex, Box } from '@chakra-ui/react'
import { useState } from "react";
import PopUp from './PopUp';
import mapStyles from './mapStyles';


const seattle = {lat: 47.6062, lng: -122.3321}


const Map = ( { foodResourcesToDisplay, searchClickedAtLeastOnce, setMarkerIsClicked, markerIsClicked, schoolToDisplay, hasError } ) => {
  // console.log("got inside MAP")
  // console.log(foodResourcesToDisplay)
  // console.log(schoolToDisplay)

  const [selectedFoodResource, setSelectedFoodResource] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCP8jDHaqKXjO91zew5-X_mKvc-1v-BW78",
  })

  if (!isLoaded) {
    return <div> Loading.. </div>
  } 

  if(loadError) {
    return <div> Sorry, we were unable to load the map. Please try again later. </div>
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
      return <Marker key = { foodResource._id } position={ coordinates } onClick={() => handleClickOnMarkers(foodResource)} icon={{url: 'https://img.icons8.com/stickers/100/000000/ingredients.png', scaledSize: new window.google.maps.Size(34,34)}} />;
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
        }}>
        { allFoodResourceMarkers }
        { schoolMarker }
        </GoogleMap>
      </Box>

      { markerIsClicked && 
        <Box position='absolute' left={'4.5%'} bottom={25}>
          <PopUp foodResource={selectedFoodResource}/>
        </Box> }

      { searchClickedAtLeastOnce && foodResourcesToDisplay.length === 0 && 
      <Box position='absolute' width={'100%'} height={'100%'}> 
        <div className="map-alert"> No matching results </div> 
      </Box>}

      { hasError &&  
      <Box position='absolute' width={'100%'} height={'100%'}> 
        <div className="map-alert"> Sorry, we were unable to load the map. Please try again later. </div> 
      </Box>}

    </Flex>
  );
}


export default Map;