const express = require('express')
const router = express.Router()
const UserController = require('../app/Controllers/UserController')

router.get('/:id', UserController.getUser)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)
router.patch('/:id/change-theme', UserController.changeTheme)
router.patch('/:id/change-avatar', UserController.changeAvatar)

module.exports = router
