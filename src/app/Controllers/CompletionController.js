const openai = require('../../config/openai')
const PromptModel = require('../Models/PromptModel')

class CompletionController {
   // [GET]: /completions/:id
   getPrompts = async function (req, res) {
      console.log('getPrompts')
      const { id: decodeId, admin } = req.body
      const id = req.params.id

      try {
         if (id === decodeId || admin) {
            const prompts = await PromptModel.find({ userId: id, type: { $in: ['user', 'ai'] } })

            res.status(200).json(prompts)
         } else {
            res.status(400).json('You do not have permission to perform this action.')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [POST]: /completions/
   createCompletion = async function (req, res) {
      console.log('createCompletion')
      const { prompt, model, maxTokens, temperature } = req.body

      try {
         if (prompt.trim()) {
            const completion = await openai.createCompletion({
               model: model || 'text-davinci-003',
               prompt,
               max_tokens: maxTokens || 100,
               temperature: temperature || 0.6,
            })

            res.status(200).json({ text: completion.data.choices[0].text })
         } else {
            res.status(403).json('Content is empty.')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [POST]:/completions/:id
   createFullCompletion = async function (req, res) {
      console.log('createFullCompletion')
      const { id: decodeId, admin, prompt, model, maxTokens, temperature } = req.body
      const id = req.params.id

      try {
         if (id === decodeId || admin) {
            if (prompt.trim()) {
               const completion = await openai.createCompletion({
                  model: model || 'text-davinci-003',
                  prompt,
                  max_tokens: maxTokens || 100,
                  temperature: temperature || 0.6,
               })

               const newCompletion = new PromptModel({
                  userId: id,
                  type: 'ai',
                  text: completion.data.choices[0].text,
               })

               const completionRes = await newCompletion.save()

               res.status(200).json(completionRes)
            } else {
               res.status(403).json('Content is empty.')
            }
         } else {
            res.status(400).json('You do not have permission to perform this action.')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [POST]: /completions/:id/prompt
   createPrompt = async function (req, res) {
      console.log('createPrompt')
      const { id: decodeId, admin, prompt } = req.body
      const id = req.params.id

      try {
         if (id === decodeId || admin) {
            if (prompt.trim()) {
               const newPrompt = new PromptModel({
                  userId: id,
                  type: 'user',
                  text: prompt,
               })

               const promptRes = await newPrompt.save()
               res.status(200).json(promptRes)
            } else {
               res.status(403).json('Content is empty.')
            }
         } else {
            res.status(400).json('You do not have permission to perform this action.')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }
}

module.exports = new CompletionController()
