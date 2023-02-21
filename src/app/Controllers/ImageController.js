const openai = require('../../config/openai')

class ImageController {
   // [POST]: /images/:id
   generate = async function (req, res) {
      console.log('create-images')
      let { id: decodeId, prompt, amount, size } = req.body
      const id = req.params.id

      try {
         if (id === decodeId || admin) {
            if (prompt.trim()) {
               amount > 10 ? (amount = 10) : amount
               amount < 1 ? (amount = 1) : amount

               console.log(['256x256', '512x512', '1024x1024'].includes(size))

               const images = await openai.createImage({
                  prompt,
                  n: Math.floor(amount) || 1,
                  size: ['256x256', '512x512', '1024x1024'].includes(size) ? size : '256x256',
               })

               // const newPrompt = new PromptModel({
               //    userId: id,
               //    type: 'user',
               //    text: prompt,
               // })

               // const newImageResponse = new PromptModel({
               //    userId: id,
               //    type: 'ai',
               //    images: images.data.data.images.map(image => image.url),
               // })

               // await newPrompt.save()
               // const imageListResponse = await newCompletion.save()

               // res.status(200).json({ images: imageListResponse })
               res.status(200).json({ images: images.data.data })
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

module.exports = new ImageController()
