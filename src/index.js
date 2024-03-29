require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const ConnectDatabase = require('./config/database')
const routes = require('./routes')

// express instance
const app = express()

// static file config
app.use(express.static(path.resolve(process.cwd(), 'public')))

// apply middlewares
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(bodyParser.json({ limit: '30mb' }))
app.use(cors())

// connect database
ConnectDatabase()

// routes
routes(app)

// app listening
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log('Server running at port:', PORT))
