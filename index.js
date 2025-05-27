const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const helmet = require('helmet')

const connectDB = require('./config/db')
const authRoutes = require('./routes/auth')

const floresRoutes = require('./routes/flores')

dotenv.config()
const app = express()

connectDB()

app.use(express.json())
app.use(cors())
app.use(helmet())

app.use('/api', authRoutes)

app.use('/api/flores', floresRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
