const openai = require('../../config/openai')

class ImageController {
   // [POST]: /images/
   generate = async function (req, res) {
      console.log('create-images')

      let { prompt, amount, size } = req.body
      try {
         if (prompt.trim()) {
            amount && Math > 10 ? (amount = 10) : amount
            amount && Math < 0 ? (amount = 1) : amount

            console.log(['256x256', '512x512', '1024x1024'].includes(size))

            const images = await openai.createImage({
               prompt,
               n: Math.floor(amount) || 1,
               size: ['256x256', '512x512', '1024x1024'].includes(size) ? size : '256x256',
            })

            res.status(200).json({ images: images.data.data })
         } else {
            res.status(403).json('Content is empty.')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }
}

module.exports = new ImageController()
