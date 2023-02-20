const UserModel = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthController {
   // [POST]: /auth/login
   login = async function (req, res) {
      console.log('login')
      const { username, password } = req.body

      try {
         const user = await UserModel.findOne({ username })

         if (user) {
            const isPassCorrect = await bcrypt.compare(password, user.password)
            if (isPassCorrect) {
               const token = jwt.sign(
                  {
                     id: user._id,
                     username: user.username,
                     admin: user.admin,
                  },
                  process.env.JWT_KEY
               )

               const { password, admin, ...otherDetails } = user._doc
               res.status(200).json({ user: otherDetails, token })
            } else {
               res.status(400).json({ error: true, message: 'Wrong password.' })
            }
         } else {
            res.status(400).json({ error: true, message: 'User does not exists.' })
         }

         res.status(200).json()
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [POST]: /auth/register
   register = async function (req, res) {
      console.log('register')
      const { username } = req.body

      try {
         const oldUser = await UserModel.findOne({ username })
         if (!oldUser) {
            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(req.body.password, salt)

            const newUser = new UserModel({
               username,
               password: hashedPass,
            })

            const user = await newUser.save()
            const token = jwt.sign(
               {
                  id: user._id,
                  username: user.username,
                  admin: user.admin,
               },
               process.env.JWT_KEY
            )

            const { password, admin, ...otherDetails } = user._doc

            res.status(200).json({ user: otherDetails, token })
         } else {
            res.status(400).json({ error: true, message: 'User is already exists.' })
         }

         res.status(200).json()
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }
}

module.exports = new AuthController()
