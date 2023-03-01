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
   createCompletion = async function (req, res) {
      console.log('create-completion')
      const { id: decodeId, admin, prompt } = req.body
      const id = req.params.id

      // check user login or not
      if (decodeId) {
         // user logined
         try {
            if (id === decodeId || admin) {
               if (prompt.trim() || model.trim()) {
                  const completion = await openai.createCompletion({
                     model: 'text-davinci-003',
                     prompt,
                     max_tokens: 100,
                     temperature: 0.6,
                  })

                  const newCompletion = new PromptModel({
                     userId: id,
                     type: 'ai',
                     text: completion.data.choices[0].text,
                  })

                  const newPrompt = new PromptModel({
                     userId: id,
                     type: 'user',
                     text: prompt,
                  })

                  await newPrompt.save()
                  const text = await newCompletion.save()

                  res.status(200).json({ text })
               } else {
                  res.status(403).json('Content is empty.')
               }
            } else {
               res.status(400).json('You do not have permission to perform this action.')
            }
         } catch (err) {
            res.status(500).json({ message: err.message })
         }
      } else {
         // user no logined
         try {
            if (prompt.trim() || model.trim()) {
               const completion = await openai.createCompletion({
                  model: 'text-davinci-003',
                  prompt,
                  max_tokens: 100,
                  temperature: 0.6,
               })
               res.status(200).json({
                  text: completion.data.choices[0].text,
                  createdAt: Date.now(),
               })
            } else {
               res.status(403).json('Content is empty.')
            }
         } catch (err) {
            res.status(500).json({ message: err.message })
         }
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

               const prompt = await newPrompt.save()
               res.status(200).json({ prompt })
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
