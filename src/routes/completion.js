const express = require('express')
const router = express.Router()
const CompletionController = require('../app/Controllers/CompletionController')
const authMiddleware = require('../app/Middlewares/AuthMiddleware')

router.post('/', CompletionController.createCompletion)

router.get('/:id', authMiddleware, CompletionController.getPrompts)
router.post('/:id', authMiddleware, CompletionController.createFullCompletion)
router.post('/:id/prompt', authMiddleware, CompletionController.createPrompt)

module.exports = router
