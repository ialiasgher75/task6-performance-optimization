const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
      directConnection: false
    })
    console.log('MongoDB Connected')
  } catch (err) {
    console.error('MongoDB Error:', err.message)
    process.exit(1)
  }
}

module.exports = connectDB