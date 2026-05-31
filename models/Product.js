const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true, index: true },
  description: { type: String },
  price:       { type: Number, required: true, index: true },
  category:    { type: String, index: true },
  stock:       { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)