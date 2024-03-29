const authMiddleware = require('../app/Middlewares/AuthMiddleware')
const authRouter = require('./auth')
const userRouter = require('./user')
const completionRouter = require('./completion')
const imageRouter = require('./image')

function routes(app) {
   app.use('/auth', authRouter)
   app.use('/users', authMiddleware, userRouter)
   app.use('/completions', completionRouter)
   app.use('/images', imageRouter)

   app.use('/', (req, res) => {
      res.send('<h1>This is AI TALKS server</h1>')
   })
}

module.exports = routes
