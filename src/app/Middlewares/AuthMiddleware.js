const jwt = require('jsonwebtoken')

function AuthMiddleware(req, res, next) {
   try {
      token = req.headers.authorization.split(' ')[1]
      if (token) {
         const decode = jwt.verify(token, process.env.JWT_KEY)
         req.body.id = decode?.id
         req.body.admin = decode?.admin
         next()
      }
   } catch (err) {
      res.status(400).json('Authorization Failure.')
   }
}

module.exports = AuthMiddleware
