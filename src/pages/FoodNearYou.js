import React, { useState } from "react";

// Import Components
import FilterBar from '../components/FilterBar';
import Map from "../components/Map";

const FoodNearYou = () => {
    const [foodResourcesToDisplay, setfoodResourcesToDisplay] = useState([]);
    // console.log(foodResourcesToDisplay); //
    return ( 
        <div className="food-near-you">
            <FilterBar setfoodResourcesToDisplay={setfoodResourcesToDisplay} />
            <Map foodResourcesToDisplay={foodResourcesToDisplay} />
        </div>
     );
}

export default FoodNearYou;