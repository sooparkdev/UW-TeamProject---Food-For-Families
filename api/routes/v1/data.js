import express from 'express'
var router = express.Router();


router.post('/', async ( req, res ) => {
    try {
        let response = await fetch('../../../data/foodResources.json')
        let foodResourcesJSON = await response.json()
        let shortResources = foodResourcesJSON.splice(0, 5)
        
        shortResources.forEach(async (foodResource) => {
            // Get the data from the object
            let frType = foodResource.food_resource_type
            let frDesc = foodResource.description
            let frAddress = foodResource.address
            let frLatitude = Number(foodResource.longitude)
            let frLongitude = Number(foodResource.longitude)
            let frPhone = foodResource.phone_number
            let frWebsite = foodResource.website
            let frFoodBankHours = foodResource.food_bank_hours
            let frCommunityFridgeHours = foodResource.community_fridge_hours
            let frMealHours = foodResource.meal_hours

            // Parse the save data object
            const newFoodResource = new req.db.FoodResource({
                "type": [ frType ],
                "description": frDesc,
                "address": frAddress,
                "latitude": frLatitude,
                "longitude": frLongitude,
                "phone_number": frPhone,
                "website": frWebsite,
                "operating_hours": {
                    "food_bank_hours": frFoodBankHours,
                    "community_fridge_hours": frCommunityFridgeHours,
                    "meal_hours": frMealHours
                }
            })

            await newFoodResource.save()
            res.send({
                "status": "success",
            })
        })
    } catch(err) {
        res.send({
            "status": "error",
            "error": err
        })
    }
})

export default router