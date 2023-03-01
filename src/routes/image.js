const express = require('express')
const router = express.Router()
const ImageController = require('../app/Controllers/ImageController')
const authMiddleware = require('../app/Middlewares/AuthMiddleware')

router.post('/', ImageController.generateImage)

router.get('/:id', authMiddleware, ImageController.getImages)
router.post('/:id', authMiddleware, ImageController.generateFullImage)
router.post('/:id/prompt', authMiddleware, ImageController.createPrompt)

module.exports = router
