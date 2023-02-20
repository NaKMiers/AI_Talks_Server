const express = require('express')
const router = express.Router()
const CompletionController = require('../app/Controllers/CompletionController')

router.get('/:id', CompletionController.getPrompt)
router.post('/:id', CompletionController.create)

module.exports = router
