import express from 'express'
var router = express.Router();

import v1Router from './v1/router.js'

router.get('/', ( req, res, next ) => {
    res.send("API is connected -- specify an API version to use it")
})

router.use('/v1', v1Router)

export default router