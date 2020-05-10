// Controllers
const items = require('../controllers/itemsController')
const mp = require('../controllers/mpController')

module.exports = express => {
  // Router Engines
  const router = express.Router()

  // load
  router.param('itemId', items.load)

  // items
  router.get('/items', items.all)
  router.post('/items', items.add)
  router.post('/items/:itemId/delete', items.delete);

  // checkout
  router.post('/checkout', mp.create)

  return router
}