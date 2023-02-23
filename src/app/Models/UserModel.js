const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
   {
      username: { type: String, require: true },
      password: { type: String, require: true },
      avatar: String,
      admin: { type: Boolean, default: false },

      theme: { type: Number, default: 0 },
      model: { type: String, default: 'text-davinci-003' },
      maxTokens: { type: Number, default: 100 },
      temperature: { type: Number, default: 0.5 },
      size: { type: String, default: '256x256' },
      amount: { type: Number, default: 1 },
      mode: { type: Number, default: 1 },
   },
   { timestamps: true }
)

module.exports = mongoose.model('users', UserSchema)
