// Import Libraries
import express from 'express'

// Set the router
var router = express.Router();

// GET
router.get('/', async (req, res) => {
    try {
        let allFormSubmissions = await req.db.FormSubmission.find()

        res.type("json")
        res.status(200).send({
            "status": "success",
            "formSubmissions": allFormSubmissions,
        })
    } catch (err) {
        res.send({
            "status": "error",
            "error": err
        })
    }
})

// POST
router.post('/', async (req, res) => {
    try {
        const sampleSubmission = new req.db.FormSubmission({
            "name": "John Doe",
            "phone_number": "206-777-3333",
            "email": "johndoe@email.com",
            "form_submission_info": {
                "name": "Fake Food Bank",
                "phone_number": "206-333-7777",
                "website": "fakewebsite.com",
                "email": "fakefoodbank@email.com",
                "food_resource_type": ["food bank", "meal"],
                "address": "7th St Fake Ave, FakeCity, FakeCountry 97777",
                "additional_info": "This is a fake food bank and should not be approved in the food resources database"
            }
        })

        await sampleSubmission.save().catch(err => res.status(400).send({
            "status": "error",
            "error": "Error with saving data to database.",
            "errorDetails": err
        }))

        res.status(200).send({
            "status": "success"
        })
    } catch (err) {
        res.send({
            "status": "error",
            "error": err
        })
    }
})

export default router