import React, { useEffect, useState, useRef } from "react";

const Filterbar = () => {
    const allSchoolsRef = useRef(null);
    const [isPending, setIsPending] = useState(false);
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [hasError, setHasError] = useState(false);

    const [school, setSchool] = useState([]);
    const [maxDistance, setMaxDistance] = useState(null);
    const [foodBankChecked, setFoodBankChecked] = useState(true);
    const [mealChecked, setMealChecked] = useState(true);
    const [communityFridgeChecked, setCommunityFridgeChecked] = useState(true);

    useEffect(() => {
        const loadAllSchools = async () => {
            try {
                let schoolResponse = await fetch(`http://localhost:4420/api/v1/schools`); // get all school
                // console.log(schoolResponse);
                let schoolJson = await schoolResponse.json();
                console.log(schoolJson.status)
                allSchoolsRef.current = schoolJson.schools.map(schoolObj => schoolObj.name)
                // console.log(allSchools);
            } catch (error) {
                console.error(error);
            }
        };
        loadAllSchools();
    }, []);  

    let handleSubmit = (e) => {
        e.preventDefault(); 
        setIsPending(true);
        loadMarkers(); // call the function that does fetching

    }

    async function loadMarkers() {
        try{
            let foodResourceResponse = await fetch(`http://localhost:4420/api/v1/foodresources?foodbank=${foodBankChecked}&meal=${mealChecked}&communityfridge=${communityFridgeChecked}&maxdistance=${maxDistance}&school=${school}`);
            let foodResourceJson = await foodResourceResponse.json();
            let foodResource = foodResourceJson.foodResources;
            console.log(foodResource); //
            
        } catch(error){
            console.log("An error has occured: " + error);
            setHasError(true); // **TO DO: DISPLAY ERROR IN THE MAP LATER
        }
    }

    const handleSchoolFilter = (e) => {
        let userInputtedSchool = e.target.value;
        let matchingSchools = allSchoolsRef.current.filter((schoolName) => {
            return schoolName.toLowerCase().includes(userInputtedSchool.toLowerCase());
        })
        setFilteredSchools(matchingSchools);
        if (userInputtedSchool === "") { 
            setFilteredSchools([]);
        } else {
            setFilteredSchools(matchingSchools);
        }
        setSchool(userInputtedSchool);
    }
    

    let schoolInputRef = React.createRef();
    let schoolsToShow = filteredSchools.slice(0, 14).map((val) => {
        return (
            <p key={val} onClick={() => {
                schoolInputRef.current.value = val;
                setSchool(val); }}
                > { val } </p> 
        );
    })


    let distanceInputRef = useRef(null);
    const handleDistanceInput = (e) => {
        let userDistance = e.target.value;
        setMaxDistance(userDistance);
        if (userDistance.match("^[0-9.]*$") && (userDistance.match(/\./g) || []).length <= 1) {
            // console.log("PASSED")
            distanceInputRef.current.style.border = "none";
            distanceInputRef.current.style.backgroundColor = "white";
            
        } else {
            // console.log("Triggered")
            distanceInputRef.current.style.border = "2px solid rgb(241, 77, 77)";
            distanceInputRef.current.style.backgroundColor = "rgb(255, 237, 237)";
        }
    }
    //console.log(maxDistance)

    return ( 
        <form className="filterForm" onSubmit={handleSubmit}>
            <div id="school">
                <div className="searchInput">
                    <input id="schoolSearchBox" onChange={handleSchoolFilter} ref={schoolInputRef} type="text" placeholder="Search Elementary Schools.." maxLength="50"/>
                    <span className="material-symbols-outlined">search</span>                
                </div>
                { filteredSchools.length !== 0 && 
                <div className="searchResult">
                    { schoolsToShow }
                </div> }
            </div>
            <div id="distance">
                <input id="distanceInputBox" onChange={handleDistanceInput} ref={distanceInputRef} type="text" placeholder="type in distance in miles.." maxLength="7"/>
            </div>
            <div id="food-source-type">
                <label htmlFor="food-bank-checkbox">  
                    <input type="checkbox" id="food-bank-checkbox" onChange={() => setFoodBankChecked(!foodBankChecked)} checked={foodBankChecked}/> Food Bank 
                </label>
                
                <label htmlFor="food-pantry-checkbox"> 
                    <input type="checkbox" id="meal-checkbox" onChange={() => setMealChecked(!mealChecked)} checked={mealChecked}/> Meal
                </label> 
                
                <label htmlFor="community-fridge-checkbox"> 
                    <input type="checkbox" id="community-fridge-checkbox" onChange={() => setCommunityFridgeChecked(!communityFridgeChecked)} checked={communityFridgeChecked}/> Community Fridge
                </label>
            </div>
            <div id="searchBtn">
                {!isPending && <button> Search </button> }
                {isPending && <button> Searching.. </button> }
            </div>
        </form>
    );
}
 
export default Filterbar;