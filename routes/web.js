// Controllers
const web = require('../controllers/webController')
const items = require('../controllers/itemsController')
const mp = require('../controllers/mpController')

module.exports = express => {
  // Router Engines
  const router = express.Router()

  // load
  router.param('itemId', items.load)
  // items
  router.get('/', web.home)
  router.get('/items', web.items)
  router.get('/items/:itemId', web.viewItem)
  // checkout
  router.post('/checkout', mp.create, web.checkoutItem)

  return router
}