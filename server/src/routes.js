const AuthenticationController = require('./controllers/AuthenticationController')
const CoffeeController = require('./controllers/CoffeeController')
const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {

  // เช็คสถานะ server
  app.get('/status', (req, res) => {
    res.send('server is running')
  })

  // AUTH 
  app.post('/register', AuthenticationController.register)
  app.post('/login', AuthenticationController.login)

  // PUBLIC 
  app.get('/coffees', CoffeeController.index)
  app.get('/coffee/:coffeeId', CoffeeController.show)

  // ต้อง login ก่อน 
  app.post('/coffee', isAuthenticated, CoffeeController.create)
  app.put('/coffee/:coffeeId', isAuthenticated, CoffeeController.put)
  app.delete('/coffee/:coffeeId', isAuthenticated, CoffeeController.remove)
}
