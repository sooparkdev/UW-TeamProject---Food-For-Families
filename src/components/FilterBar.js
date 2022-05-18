import React, { useEffect, useState, useRef } from "react";

const Filterbar = ( {setfoodResourcesToDisplay, setSearchClickedAtLeastOnce, setMarkerIsClicked, setSchoolToDisplay, setHasError }) => {
    const allSchoolsRef = useRef(null);
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [isPending, setIsPending] = useState(false);

    const [school, setSchool] = useState("");
    const [hasSchoolInputError, setHasSchoolInputError] = useState(false);

    const [maxDistance, setMaxDistance] = useState(null);
    const [hasDistanceInputError, setHasDistanceInputError] = useState(false);

    const [foodBankChecked, setFoodBankChecked] = useState(true);
    const [mealChecked, setMealChecked] = useState(true);
    const [communityFridgeChecked, setCommunityFridgeChecked] = useState(true);

    useEffect(() => {
        const loadAllSchools = async () => {
            try {
                let schoolResponse = await fetch(`http://localhost:4420/api/v1/schools`); // get all school
                // console.log(schoolResponse);
                let schoolJson = await schoolResponse.json();
                // console.log(schoolJson.status)
                allSchoolsRef.current = schoolJson.schools.map(schoolObj => schoolObj.name)
                // console.log(allSchools);
            } catch (error) {
                console.error(error);
            }
        };
        loadAllSchools();
        console.log("FETCH COMPLETE")
    }, []);  

    let handleSubmit = (e) => {
        e.preventDefault(); 
        setSearchClickedAtLeastOnce(true);
        setIsPending(true);
        setMarkerIsClicked(false);
        handleSearch(); // call the function that does fetching
    }

    async function handleSearch() {
        try{
            let foodResourceResponse = await fetch(`http://localhost:4420/api/v1/foodresources?foodbank=${foodBankChecked}&meal=${mealChecked}&communityfridge=${communityFridgeChecked}&maxdistance=${maxDistance}&school=${school}`);
            let foodResourceJson = await foodResourceResponse.json();
            let foodResource = foodResourceJson.foodResources;
            // console.log(foodResource); //
            setfoodResourcesToDisplay(foodResource);
            setSchoolToDisplay(foodResourceJson.school);
            setIsPending(false);
            setHasError(false);
        } catch(error){
            console.log("An error has occured: " + error);
            setHasError(true); // **TO DO: DISPLAY ERROR IN THE MAP LATER
        }
    }


    let schoolInputRef = React.createRef()

    const handleSchoolFilter = (e) => {
        let userInputtedSchool = e.target.value;
        setSchool(userInputtedSchool); //might potentially cause error
        // console.log(userInputtedSchool);
        let matchingSchools = allSchoolsRef.current.filter((schoolName) => {
            return schoolName.toLowerCase().includes(userInputtedSchool.toLowerCase());
        })
        setFilteredSchools(matchingSchools);
        
        if (userInputtedSchool === "") { 
            setFilteredSchools([]);
        } else if (school !== "" && matchingSchools.length === 0) {
            // console.log("Triggered")
            schoolInputRef.current.style.border = "2px solid rgb(241, 77, 77)";
            schoolInputRef.current.style.backgroundColor = "rgb(255, 237, 237)";
            setHasSchoolInputError(true);
        } else {
            schoolInputRef.current.style.border = "none";
            schoolInputRef.current.style.backgroundColor = "white";
            setHasSchoolInputError(false);
            setFilteredSchools(matchingSchools);
        }

    }

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
        let userInputtedDistance = e.target.value;
        let distanceToTwoDecimals = parseFloat(userInputtedDistance).toFixed(2); // round the distance input to two decimal places
        setMaxDistance(distanceToTwoDecimals);
        if (userInputtedDistance.match("^[0-9.]*$") && (userInputtedDistance.match(/\./g) || []).length <= 1) {
            // console.log("PASSED")
            distanceInputRef.current.style.border = "none";
            distanceInputRef.current.style.backgroundColor = "white";
            setHasDistanceInputError(false);
            
        } else {
            // console.log("Triggered")
            distanceInputRef.current.style.border = "2px solid rgb(241, 77, 77)";
            distanceInputRef.current.style.backgroundColor = "rgb(255, 237, 237)";
            setHasDistanceInputError(true);
        }
    }
    //console.log(maxDistance)

    return ( 
        <form className="filterForm" onSubmit={handleSubmit}>
            <div id="school">
                <div className="searchInput">
                    <input id="schoolSearchBox" onChange={handleSchoolFilter} ref={schoolInputRef} type="text" placeholder="Search Elementary Schools.." maxLength="70" required/>
                    <span className="material-symbols-outlined">search</span>                
                </div>
                { filteredSchools.length !== 0 && 
                <div className="searchResult">
                    { schoolsToShow }
                </div> }
            </div>
            {
                hasSchoolInputError &&
                <div className="alert">
                    <i className="gg-info"></i>
                    <p> School Not Found </p>
                </div>
            }
            <div id="distance">
                <input id="distanceInputBox" onChange={handleDistanceInput} ref={distanceInputRef} type="text" placeholder="type in distance in miles.." maxLength="7"/>
            </div>
            {
                hasDistanceInputError && 
                <div className="alert">
                    <i className="gg-info"></i>
                    <p> Invalid input: only positive real numbers are allowed </p>
                </div>
            }
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