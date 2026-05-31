const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const cache = require('../middleware/cache')
const client = require('../config/redis')

// GET all products and cache 60 seconds
router.get('/', cache(60), async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET single product and cached 60 seconds
router.get('/:id', cache(60), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST product and clear cache
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    await client.del('/products')
    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// PUT product and clear cache
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    await client.del('/products')
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE product and clear cache
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    await client.del('/products')
    res.json({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router