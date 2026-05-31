const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
require('./config/redis')

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/products', require('./routes/products'))

app.get('/', (req, res) => {
  res.json({ message: 'Task 6 - Performance Optimization' })
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})