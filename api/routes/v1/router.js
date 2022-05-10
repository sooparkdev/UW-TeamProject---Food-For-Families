import express from 'express'
var router = express.Router();

import testRouter from './test.js'

router.get('/', ( req, res, next ) => {
    res.send("API Version 1")
})

router.use('/test', testRouter)

export default router