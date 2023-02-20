const UserModel = require('../Models/UserModel')

class UserController {
   // [GET]: /users/:id
   getUser = async function (req, res) {
      console.log('getUser')

      try {
         const user = await UserModel.findById(req.params.id)
         const { password, admin, ...otherDetails } = user._doc

         res.status(200).json(otherDetails)
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [DELETE]: /users/:id
   deleteUser = async function (req, res) {
      console.log('deleteUser')
      const { id: decodeId, admin } = req.body
      const id = req.params.id

      if (id === decodeId || admin) {
         await UserModel.findByIdAndDelete(id)
      } else {
         res.status(404).json('You do not have permission to perform this action.')
      }

      try {
         res.status(200).json()
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [PUT]: /users/:id
   updateUser = async function (req, res) {
      console.log('updateUser')

      try {
         res.status(200).json()
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }
}

module.exports = new UserController()
