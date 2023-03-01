const UserModel = require('../Models/UserModel')
const multer = require('multer')

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, './public/imgs')
   },
   filename: (req, file, cb) => {
      cb(null, req.body.name)
   },
})
const upload = multer({ storage }).single('file')

class UserController {
   // [GET]: /users/:id
   getUser = async function (req, res) {
      console.log('getUser')
      const { id: decodeId, admin } = req.body
      const id = req.params.id

      try {
         if (id === decodeId || admin) {
            const user = await UserModel.findById(id)
            const { password, admin, ...otherDetails } = user._doc

            res.status(200).json(otherDetails)
         } else {
            res.status(404).json('You do not have permission to perform this action.')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [DELETE]: /users/:id
   deleteUser = async function (req, res) {
      console.log('deleteUser')
      const { id: decodeId, admin } = req.body
      const id = req.params.id

      try {
         if (id === decodeId || admin) {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json()
         } else {
            res.status(404).json('You do not have permission to perform this action.')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [PUT]: /users/:id
   updateUser = async function (req, res) {
      console.log('updateUser')
      const { id: decodeId, admin } = req.body
      const id = req.params.id

      try {
         if (id === decodeId || admin) {
            res.status(200).json()
         } else {
            res.status(404).json('You do not have permission to perform this action.')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [PATCH]: /users/:id/change-avatar
   changeAvatar = async function (req, res) {
      console.log('changeAvatar')
      const { id: decodeId, admin } = req.body
      const id = req.params.id

      upload(req, res, async () => {
         try {
            if (id === decodeId || admin) {
               const imageName = req.file.filename
               console.log(imageName)
               const userEdited = await UserModel.findByIdAndUpdate(
                  id,
                  { $set: { avatar: imageName } },
                  { new: true }
               )

               const { avatar } = userEdited._doc
               res.status(200).json(avatar)
            } else {
               res.status(404).json('You do not have permission to perform this action.')
            }
         } catch (err) {
            res.status(500).json({ message: err.message })
         }
      })
   }

   // [PATCH]: /users/:id/change-parameter
   changeParameter = async function (req, res) {
      console.log('changeParameter')
      const { id: decodeId, admin, data } = req.body
      const id = req.params.id

      try {
         if (id === decodeId || admin) {
            const userEdited = await UserModel.findByIdAndUpdate(id, data, { new: true })
            const { password, admin, ...otherDetails } = userEdited._doc
            res.status(200).json(otherDetails)
         } else {
            res.status(404).json('You do not have permission to perform this action.')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }
}

module.exports = new UserController()
