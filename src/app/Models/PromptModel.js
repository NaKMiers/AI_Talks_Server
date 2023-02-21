const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PromptSchema = new Schema(
   {
      userId: { type: String, require: true },
      type: String,
      text: String,
      images: Array,
   },
   { timestamps: true }
)

module.exports = mongoose.model('prompts', PromptSchema)
