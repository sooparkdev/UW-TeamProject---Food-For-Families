// Make "require" available
import { createRequire } from "module"
const require = createRequire(import.meta.url)

// Import Libraries
import express from 'express'

// Import the Food Resources JSON data
const schools = require('../../../../data/schools.json')

// Set the router
var router = express.Router();

// GET
router.get('/', async (req, res) => {
    try {
        let allSchools = await req.db.School.find()

        res.type("json")
        res.body = allSchools
        res.status(200).send({
            "status": "success",
            "schools": allSchools
        })
    } catch (err) {
        res.status(500).send({
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
        if (Object.keys(schools).length === 0) {
            res.status(400).send({
                "status": "error",
                "error": "JSON had no data to import"
            })
        }
        // For each resource in the food resource JSON data, parse all the data correctly so that it matches the model in the database
        schools.forEach(async (school) => {
            try {
                // Get the data from the object
                let name = school.school_name
                let latitude, longitude
                latitude = Number(school.latitude)
                longitude = Number(school.longitude)

                // Parse the save data object
                const newSchool = new req.db.School({
                    "name": name,
                    "latitude": latitude,
                    "longitude": longitude
                })

                await newSchool.save()
            } catch (err) {
                thereWasErrors = true
            }
        })

        // Log error message if there was any
        if(thereWasErrors) {
            console.log("There was an error importing one or more objects of data. These items were skipped.")
        }

        // Successful saves!
        res.status(201).send({
            "status": "success",
        })
    } catch (err) {
        res.status(500).send({
            "status": "error",
            "error": err
        })
    }
})

// -----------------
// Schools Data
// -----------------

export default router