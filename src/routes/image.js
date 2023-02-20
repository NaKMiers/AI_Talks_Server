const express = require('express')
const router = express.Router()
const ImageController = require('../app/Controllers/ImageController')

router.post('/', ImageController.generate)

module.exports = router
