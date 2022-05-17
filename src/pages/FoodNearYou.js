import React, { useState } from "react";

// Import Components
import FilterBar from '../components/FilterBar';
import Map from "../components/Map";

const FoodNearYou = () => {
    const [foodResourcesToDisplay, setfoodResourcesToDisplay] = useState([]);
    const [schoolToDisplay, setSchoolToDisplay] = useState(null);
    const [searchClickedAtLeastOnce, setSearchClickedAtLeastOnce] = useState(false);
    const [markerIsClicked, setMarkerIsClicked] = useState(false);
    // console.log(foodResourcesToDisplay); //
    return ( 
        <div className="food-near-you">
            <FilterBar setfoodResourcesToDisplay={setfoodResourcesToDisplay} setSearchClickedAtLeastOnce={setSearchClickedAtLeastOnce} setMarkerIsClicked={setMarkerIsClicked} setSchoolToDisplay={setSchoolToDisplay} />
            <Map foodResourcesToDisplay={foodResourcesToDisplay} searchClickedAtLeastOnce={searchClickedAtLeastOnce} setMarkerIsClicked={setMarkerIsClicked} markerIsClicked={markerIsClicked} schoolToDisplay={schoolToDisplay} />
        </div>
     );
}

export default FoodNearYou;