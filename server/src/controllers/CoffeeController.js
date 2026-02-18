const { Coffee } = require('../models')

module.exports = {

  async index (req, res) {
    try {
      const coffees = await Coffee.findAll()
      res.send(coffees)
    } catch (err) {
      res.status(500).send({ error: 'Cannot fetch coffees' })
    }
  },

  async show (req, res) {
    try {
      const coffee = await Coffee.findByPk(req.params.coffeeId)
      if (!coffee) {
        return res.status(404).send({ error: 'Coffee not found' })
      }
      res.send(coffee)
    } catch (err) {
      res.status(500).send({ error: 'Cannot fetch coffee' })
    }
  },

  async create (req, res) {
    try {
      const coffee = await Coffee.create(req.body)
      res.send(coffee)
    } catch (err) {
      res.status(500).send({ error: 'Cannot create coffee' })
    }
  },

  async put (req, res) {
    try {
      const coffee = await Coffee.findByPk(req.params.coffeeId)
      if (!coffee) {
        return res.status(404).send({ error: 'Coffee not found' })
      }
      await coffee.update(req.body)
      res.send(coffee)
    } catch (err) {
      res.status(500).send({ error: 'Cannot update coffee' })
    }
  },

  async remove (req, res) {
    try {
      const coffee = await Coffee.findByPk(req.params.coffeeId)
      if (!coffee) {
        return res.status(404).send({ error: 'Coffee not found' })
      }
      await coffee.destroy()
      res.send({ message: 'Coffee deleted' })
    } catch (err) {
      res.status(500).send({ error: 'Cannot delete coffee' })
    }
  }
}
