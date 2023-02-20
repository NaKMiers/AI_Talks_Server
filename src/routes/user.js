const express = require('express')
const router = express.Router()
const UserController = require('../app/Controllers/UserController')

router.get('/:id', UserController.getUser)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

module.exports = router
