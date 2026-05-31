const client = require('../config/redis')

const cache = (duration) => async (req, res, next) => {
  const key = req.originalUrl

  try {
    const cached = await client.get(key)
    if (cached) {
      console.log('Cache HIT:', key)
      return res.json(JSON.parse(cached))
    }
    console.log('Cache MISS:', key)
    res.sendResponse = res.json
    res.json = async (body) => {
      await client.setEx(key, duration, JSON.stringify(body))
      res.sendResponse(body)
    }
    next()
  } catch (err) {
    next()
  }
}

module.exports = cache