import express from 'express'
import foodResourceRouter from './foodresources/foodResources.js'
import schoolsRouter from './schools/schools.js'

var router = express.Router();


router.get('/', ( req, res, next ) => {
    res.send("API Version 1")
})

router.use('/foodResources', foodResourceRouter)
router.use('/schools', schoolsRouter)

export default router