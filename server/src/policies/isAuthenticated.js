const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).send({ error: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(token, config.authentication.jwtSecret)

    req.user = decoded
    next()

  } catch (err) {
    res.status(401).send({ error: 'Invalid token' })
  }
}
