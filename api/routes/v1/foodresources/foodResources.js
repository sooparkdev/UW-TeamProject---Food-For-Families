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
        let allFoodResources = await req.db.FoodResource.find()

        res.type("json")
        res.status(200).send({
            "status": "success",
            "foodResources": allFoodResources
        })
    } catch (err) {
        res.send({
            "status": "error",
            "error": err
        })
    }
})

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