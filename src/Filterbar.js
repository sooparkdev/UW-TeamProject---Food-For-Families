import React, { useState } from "react";

const Filterbar = () => {
    let mockData = ["elementary school1", "elementary school2", "looooooooooooong elementary school3", "elementary school4", "elementary school5", "elementary school6", "elementary school7"];

    const [isPending, setIsPending] = useState(false);
    const [filteredSchools, setFilteredSchools] = useState([]);

    let handleSubmit = (e) => {
        e.preventDefault(); {/* prevents refreshing the page on submit */}
        
        setIsPending(true);
    }

    const handleSchoolFilter = (e) => {
        let userInputtedSchool = e.target.value;
        let matchingSchools = mockData.filter((schoolName) => {
            return schoolName.toLowerCase().includes(userInputtedSchool.toLowerCase());
        })
        setFilteredSchools(matchingSchools);
        {/* Once the filter is ran, we still get a full array back even if the text input is empty. 
            So we need to have this filter at the if-else to verify once more */}
        if (userInputtedSchool === "") {
            setFilteredSchools([]);
        } else {
            setFilteredSchools(matchingSchools);
        }
    }

    let inputRef = React.createRef();

    let schoolsToShow = filteredSchools.slice(0, 14).map((val) => {
        return (
            <p key={val} onClick={() => inputRef.current.value = val}> { val } </p>
        );
    })


    return ( 
        <form className="filterForm" onSubmit={handleSubmit}>
            <div id="school">
                <div className="searchInput">
                    <input id="schoolSearchBox" onChange={handleSchoolFilter} ref={inputRef}  type="text" placeholder="Search Elementary Schools.." maxLength="50"/>
                    <span className="material-symbols-outlined">search</span>                
                </div>
                { filteredSchools.length !== 0 && 
                <div className="searchResult">
                    { schoolsToShow }
                </div> }
            </div>
            <div id="distance">
                <input id="distanceInputBox" type="text" placeholder="type in distance in miles.." maxLength="7"/>
            </div>
            <div id="food-source-type">
                <label htmlFor="food-bank-checkbox">  
                    <input type="checkbox" id="food-bank-checkbox"/> Food Bank 
                </label>
                
                <label htmlFor="food-pantry-checkbox"> 
                    <input type="checkbox" id="food-pantry-checkbox" /> Food Pantry 
                </label>
                
                <label htmlFor="community-fridge-checkbox"> 
                    <input type="checkbox" id="community-fridge-checkbox"/> Community Fridge
                </label>
               
                <label htmlFor="pop-up-checkbox">  
                    <input type="checkbox" id="pop-up-checkbox"/> Pop-up
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