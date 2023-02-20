const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
   {
      username: { type: String, require: true },
      password: { type: String, require: true },
      avatar: String,
      admin: { type: Boolean, default: false },
   },
   { timestamps: true }
)

module.exports = mongoose.model('users', UserSchema)
