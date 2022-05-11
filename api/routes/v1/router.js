import express from 'express'
import dataRouter from './data.js'

var router = express.Router();


router.get('/', ( req, res, next ) => {
    res.send("API Version 1")
})

router.use('/data', dataRouter)

export default router