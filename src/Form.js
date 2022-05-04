import React from 'react';

const Form = () => {
    return ( 
        <div className="form">
           <h1>form</h1>

           <div id="your-name">
              <h2>Your Name</h2>
              <input id="firstName" type="text" placeholder="e.g. John Doe..."/>
            </div>

            <div id="your-number">
              <h2>Your Phone Number</h2>
              <input id="phoneNumber" type="text" placeholder="e.g. xxx-xxx-xxxx" maxLength="12"/>
            </div>

            <div id="your-email">
              <h2>Your Email</h2>
              <input id="email" type="text" placeholder="e.g. JohnDoe@gmail.com" />
            </div>

            <div id="food-name">
              <h2>Food Resource Name</h2>
              <input id="orgName" type="text" placeholder="e.g. Food for Friends" />
            </div>

            <div id="food-number">
              <h2>Food Resource Number</h2>
              <input id="orgPhoneNumber" type="text" placeholder="e.g. xxx-xxx-xxxx" maxLength="12"/>
            </div>

            <div id="food-website">
              <h2>Food Resource Website</h2>
              <input id="orgWebsite" type="text" placeholder="e.g. foodforfriends.com" />
            </div>

            <div id="food-email">
              <h2>Food Resource Email</h2>
              <input id="orgEmail" type="text" placeholder="e.g. FoodForFriends@gmail.com" />
            </div>

           <div id="food-source-type">
              <h2>Food Resource Type</h2>
              <label htmlFor="food-bank-checkbox">  
                  <input type="checkbox" id="food-bank-checkbox"/> Food Bank 
              </label>
              <label htmlFor="food-pantry-checkbox"> 
                  <input type="checkbox" id="food-pantry-checkbox" /> Meals 
              </label>
              <label htmlFor="community-fridge-checkbox"> 
                  <input type="checkbox" id="community-fridge-checkbox"/> Community Fridge
              </label>
            </div>

            <div id="food-address">
              <h2>Food Resource Address</h2>
              <input id="orgAddress" type="text" placeholder="e.g. 1st PL SE, Seattle, WA 98105" />
            </div>

            <div id="food-description">
              <h2>Food Resource Additional Information</h2>
              <input id="orgInfo" type="text" placeholder="The description should explain a little about the food source, hours of operation, and any other additional information you believe is important to know!" />
            </div>

            <div id="submit">
               <button> Submit </button>
            </div>
         
         </div>
     );
}
 
export default Form;