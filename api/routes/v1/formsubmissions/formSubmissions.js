// Import Libraries
import express from 'express'
import db from '../../../db';

// Set the router
var router = express.Router();

// GET
router.get('/', async (req, res) => {
    try {
        let allFormSubmissions = await req.db.FormSubmission.find()

        res.type("json")
        res.status(200).send({
            "status": "success",
            "foodResources": allFormSubmissions
        })
    } catch (err) {
        res.send({
            "status": "error",
            "error": err
        })
    }
})

export default router