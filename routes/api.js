// Controllers
const mp = require('../controllers/mpController')
const items = require('../controllers/itemsController')

module.exports = express => {
  // Router Engines
  const router = express.Router()

  // load
  router.param('itemId', items.load)

  // items
  router.get('/items', items.all)
  router.post('/items', items.add)
  router.post('/items/:itemId/delete', items.delete);

  return router
}