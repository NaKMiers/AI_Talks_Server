const openai = require('../../config/openai')
const PromptModel = require('../Models/PromptModel')

class CompletionController {
   // [GET]: /completions/:id
   getPrompt = async function (req, res) {
      console.log('getPrompt')
      const { id: decodeId, admin } = req.body
      const id = req.params.id

      try {
         if (id === decodeId || admin) {
            const prompts = PromptModel.find({ userId: id })

            res.status(200).json(prompts)
         } else {
            res.status(400).json('You do not have permission to perform this action.')
         }

         res.status(200).json()
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [POST]: /completions/:id
   create = async function (req, res) {
      console.log('create-completion')
      const { id: decodeId, admin, prompt } = req.body
      const id = req.params.id

      try {
         if (id === decodeId || admin) {
            const completion = await openai.createCompletion({
               model: 'text-davinci-003',
               prompt,
               max_tokens: 100,
               temperature: 0.6,
            })

            const newPrompt = new PromptModel({
               userId: id,
               type: 'user',
               text: prompt,
            })

            const newCompletion = new PromptModel({
               userId: id,
               type: 'ai',
               text: completion.data.choices[0].text,
            })

            await newPrompt.save()
            const text = await newCompletion.save()

            res.status(200).json({ text })
         } else {
            res.status(400).json('You do not have permission to perform this action.')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }
}

module.exports = new CompletionController()
