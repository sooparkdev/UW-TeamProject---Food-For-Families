// Import Libraries
import express from 'express'

// Import Services
import logColored from '../services/logColored.js'

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
        checkTest(req.query.test, res)

        let body = req.body

        if (body === null || Object.keys(body).length === 0) {
            res.status(400).send({
                "status": "error",
                "error": "No request body"
            })
            return
        }

        if (!hasAllProperties(body)) {
            res.status(400).send({
                "status": "error",
                "error": "Invalid or incomplete request body"
            })
            return
        }

        const newFormSubmission = new req.db.FormSubmission({
            "name": body.name,
            "phone_number": body.phone_number,
            "email": body.email,
            "form_submission_info": {
                "name": body.resource_name,
                "phone_number": body.resource_phone,
                "website": body.resource_website,
                "email": body.resource_email,
                "food_resource_type": body.resource_type,
                "address": body.resource_address,
                "additional_info": body.resource_additional_info
            }
        })

        await newFormSubmission.save()

        res.status(201).send({
            "status": "success"
        })
    } catch (err) {
        res.status(500).send({
            "status": "error",
            "error": err
        })
    }
})

async function checkTest(testing, res) {
    if (testing) {
        // Sample Submission
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

        await sampleSubmission.save()
        res.status(201).send({
            "status": "success"
        })
        return
    }
}

function hasAllProperties(body) {
    if(Object.keys(body).length == 10) {
        return true
    } else {
        return false
    }
}

export default router