// Controllers
const mp = require('../controllers/mpController')
const items = require('../controllers/itemsController')

module.exports = express => {
  // Router Engines
  const router = express.Router()

  // mp
  router.post('/create/preference', mp.create)

  // items
  router.get('/items', items.all)
  router.post('/items', items.add)

  return router
}