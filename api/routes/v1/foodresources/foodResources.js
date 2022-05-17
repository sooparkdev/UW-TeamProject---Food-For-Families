// Make "require" available
import { createRequire } from "module"
const require = createRequire(import.meta.url)

// Import Libraries
import express from 'express'

// Import the Food Resources JSON data
const foodResources = require('../../../../data/foodResources.json')

// Set the router
var router = express.Router();

// GET
router.get('/', async (req, res) => {
    try {
        let foodBank = req.query.foodbank;
        let meal = req.query.meal;
        let communityFridge = req.query.communityfridge;
        let maxDistance = req.query.maxdistance;
        let school = req.query.school;

        let foodType = [];
        console.log("food bank " + foodBank);
        console.log("meal " + meal);
        console.log("community fridge " + communityFridge);

        // if TRUE add it to the array 
        if(foodBank === 'true') {
            foodType.push("food bank");
        }
        if(meal === 'true') {
            foodType.push("meal");
        }
        if(communityFridge === 'true') {
            foodType.push("community fridge");
        }

        let filteredFoodTypes = await req.db.FoodResource.find( { food_resource_type: { $in: foodType} } ).lean()

        let newFilteredFoodTypes = filteredFoodTypes.filter((foodResource) => { //additional filter with filter through MongoDB not working properly
            var found = false;
            for(var i = 0; i < foodType.length; i++) {
                if(foodResource.food_resource_type.includes(foodType[i])) {
                    found = true;
                    break;
                }
            }
            return found;
        })

        // console.log(newFilteredFoodTypes);

        let schoolResponse = await fetch(`http://localhost:4420/api/v1/schools/getOneSchool?school=${school}`); // do the school fetching here
        let schoolJson = await schoolResponse.json();
        let selectedSchool = schoolJson.school[0];
        // console.log(selectedSchool);

        // TO DO: if there is no input in the distance: return all
        newFilteredFoodTypes.forEach(function (foodResource) {
            foodResource["distance"] = calculateDistance(selectedSchool.latitude, selectedSchool.longitude, foodResource.latitude, foodResource.longitude).toFixed(2);
        });
        // console.log("**************FOOD RESOURCE");
        // console.log(newFilteredFoodTypes);

        let matchingFoodResources = newFilteredFoodTypes.filter((foodResource) => {
            // console.log(foodResource.distance <= maxDistance)
            return foodResource.distance <= maxDistance;
        })
        //console.log(matchingFoodResources);

        res.type("json")
        // res.body = matchingFoodResources;
        res.status(200).send ({
            "status": "success",
            "foodResources": matchingFoodResources,
            "school": selectedSchool
        })
    } catch (err) {
        res.status(500).send({
            "status": "error",
            "error": err
        })
    }
})

function calculateDistance(schoolLat, schoolLng, foodResourceLat, foodResourceLng) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = schoolLat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = foodResourceLat * (Math.PI / 180); // Convert degrees to radians
    var diffLat = rlat2 - rlat1; // Radian difference (latitudes)
    var diffLng = ((-1 * foodResourceLng) - (-1 *schoolLng)) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(diffLat/2)*Math.sin(diffLat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(diffLng/2)*Math.sin(diffLng/2)));
    return d;   
}

// function calculateDistance(schoolLat, schoolLng, foodResourceLat, foodResourceLng) {
//     // console.log("school LAT : " + schoolLat)
//     // console.log("school LNG : " + schoolLat)
//     // console.log("food resource LAT : " + foodResourceLat)
//     // console.log("food resource LNG : " + foodResourceLng)
//     var R = 3956; // Radius of the Earth in miles
//     var rlat1 = schoolLat * (Math.PI / 180); // Convert degrees to radians
//     var rlat2 = foodResourceLat * (Math.PI / 180); // Convert degrees to radians
//     var rlng1 = (-1 * schoolLng) * (Math.PI / 180);
//     console.log(rlng1);
//     var rlng2 = (-1 * foodResourceLng) * (Math.PI / 180);
//     var diffLat = rlat2 - rlat1; // Radian difference (latitudes)
//     var diffLng = rlng2 - rlng1 // Radian difference (longitudes)

//     let ans1 = Math.pow(Math.sin(diffLat / 2), 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.pow(Math.sin(diffLng / 2), 2);
//     let d = 2 * Math.asin(Math.sqrt(ans1)) * R;
//     // console.log(d);
//     return d;   
// }

// POST
router.post('/import', async (req, res) => {
    try {
        let thereWasErrors = false
        // Check if the schools data is empty
        if (Object.keys(foodResources).length === 0) {
            res.status(400).send({
                "status": "error",
                "error": "JSON had no data to import"
            })
        }

        // For each resource in the food resource JSON data, parse all the data correctly so that it matches the model in the database
        foodResources.forEach(async (foodResource) => {
            try {
                // Get the data from the object
                let frType = parseData(foodResource.food_resource_type)
                let frDesc = foodResource.description
                let frAddress = foodResource.address
                let frLatitude = Number(foodResource.longitude)
                let frLongitude = Number(foodResource.longitude)
                let frPhone = foodResource.phone_number
                let frWebsite = foodResource.website
                let frFoodBankHours = parseData(foodResource.food_bank_hours)
                let frCommunityFridgeHours = parseData(foodResource.community_fridge_hours)
                let frMealHours = parseData(foodResource.meal_hours)

                let foodBankHours = setHours(frFoodBankHours)
                let communityFridgeHours = setHours(frCommunityFridgeHours)
                let mealHours = setHours(frMealHours)

                let operatingHours = {
                    "food_bank_hours": foodBankHours,
                    "community_fridge_hours": communityFridgeHours,
                    "meal_hours": mealHours
                }

                // Parse the save data object
                const newFoodResource = new req.db.FoodResource({
                    "type": frType,
                    "description": frDesc,
                    "address": frAddress,
                    "latitude": frLatitude,
                    "longitude": frLongitude,
                    "phone_number": frPhone,
                    "website": frWebsite,
                    "operating_hours": operatingHours
                })

                await newFoodResource.save()
            } catch (err) {
                thereWasErrors = true
            }
        })

        // Log error message if there was any
        if(thereWasErrors) {
            console.log("There was an error importing one or more objects of data. These items were skipped.")
        }

        // Successful saves!
        res.status(200).send({
            "status": "success",
        })
    } catch (err) {
        res.status(500).send({
            "status": "error",
            "error": err
        })
    }
})

function parseData(data) {
    try {
        let JSONData = JSON.parse(data)
        return JSONData
    } catch (err) {
        return {}
    }
}

function setHours(foodResource) {
    let ret = []
    Object.entries(foodResource).forEach((dayObject) => {
        const [key, value] = dayObject
        let operationHour = {
            "day": key,
            "open": value.open,
            "close": value.close
        }
        ret.push(operationHour)
    })

    return ret
}

// -----------------
// Schools Data
// -----------------

export default router