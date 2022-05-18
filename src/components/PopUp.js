import React, { useState } from "react";

const PopUp = ( { foodResource } ) => {
  // console.log("pop up triggered")
  // console.log(foodResource)

  const [expandClicked, setExpandClicked] = useState(false);

  let foodBankHrsArray = foodResource.operating_hours.food_bank_hours?.map((dayObj) => {
    return dayObj?.day + " " + dayObj.open + "-" + dayObj.close;
  })
  let foodBankHrsToDisplay;
  if(foodResource.food_resource_type.includes("food bank") && foodBankHrsArray.length === 0) {
    foodBankHrsToDisplay = "Food Bank: N/A";
  } else if (!foodResource.food_resource_type.includes("food bank")) {
    foodBankHrsToDisplay = null;
  } else {
    foodBankHrsToDisplay = "Food Bank: " + foodBankHrsArray.join(" | ");
  }


  let mealHrsArray = foodResource.operating_hours.meal_hours?.map((dayObj) => {
    return dayObj?.day + " " + dayObj.open + "-" + dayObj.close;
  })
  let mealHrsToDisplay;
  if(foodResource.food_resource_type.includes("meal") && mealHrsArray.length === 0) {
    mealHrsToDisplay = "Meal: N/A";
  } else if (!foodResource.food_resource_type.includes("meal")) {
    mealHrsToDisplay = null;
  } else {
    mealHrsToDisplay = "Meal: " + mealHrsArray.join(" | ");
  }


  let communityFridgeHrsArray = foodResource.operating_hours.community_fridge_hours?.map((dayObj) => {
    return dayObj?.day + " " + dayObj.open + "-" + dayObj.close;
  })
  let communityFridgeHrsToDisplay;
  if(foodResource.food_resource_type.includes("community fridge") && communityFridgeHrsArray.length === 0) {
    communityFridgeHrsToDisplay = "Community Fridge: N/A";
  } else if (!foodResource.food_resource_type.includes("community fridge")) {
    communityFridgeHrsToDisplay = null;
  } else {
    communityFridgeHrsToDisplay = "Community Fridge: " + communityFridgeHrsArray.join(" | ");
  }

  const handleExpandClick = () => {
    setExpandClicked(!expandClicked);
  }

  return (
    <div className="marker-popup">

      <div className="expand-toggle-icon" onClick={handleExpandClick}>
        { expandClicked? <i className="fa-solid fa-angle-down"></i> : <i className="fa-solid fa-angle-up"></i> }
      </div>

      <div className={ expandClicked? 'show' : 'hide' }>
        <h1> Type: </h1> 
        <p> {foodResource.food_resource_type? foodResource.food_resource_type.join(', ') : "N/A" } </p> 
        <h1> Description: </h1> 
        <p> {foodResource.description? foodResource.description : "N/A" } </p> 
        <h1> Address: </h1> 
        <address> {foodResource.address? foodResource.address : "N/A" } </address>
        <h1> Phone Number: </h1> 
        <a href={"tel:" + foodResource.phone_number? foodResource.phone_number : "N/A" }> {foodResource.phone_number? foodResource.phone_number : "N/A"} </a>
        <h1> Operating Hours: </h1> 
        <p> { foodBankHrsToDisplay } </p>
        <p> { mealHrsToDisplay } </p>
        <p> { communityFridgeHrsToDisplay } </p>
        <h1> Distance: </h1> 
        <p> { foodResource.distance? foodResource.distance + " miles" : "N/A"  }</p>
      </div>

    </div>
  )
}

export default PopUp;