const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

// ฟังก์ชันสร้าง JWT
function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {

  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user)
    } catch (err) {
      res.status(400).send({ error: 'Register failed' })
    }
  },

  async login (req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ where: { email } })

      if (!user) {
        return res.status(403).send({ error: 'User not found' })
      }

      const isValid = await user.comparePassword(password)

      if (!isValid) {
        return res.status(403).send({ error: 'Password incorrect' })
      }

      const userJSON = user.toJSON()

      res.send({
        user: userJSON,
        token: jwtSignUser(userJSON)
      })

    } catch (err) {
      console.log(err)
      res.status(500).send({ error: 'Login error' })
    }
  }

}
