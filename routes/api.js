// Controllers
const items = require('../controllers/itemsController')
const auth = require('../controllers/authController')
const mp = require('../controllers/mpController')

module.exports = express => {
  // Router Engines
  const router = express.Router()

  // load
  router.param('itemId', items.load)

  // items
  router.get('/items', items.all)
  router.post('/items', items.add)
  router.post('/items/search', items.search)
  router.post('/items/:itemId/delete', items.delete);

  // checkout
  router.post('/checkout', mp.create)

  // auth
  router.post('/auth', auth.signIn)
  router.post('/auth/out', auth.signOut)

  return router
}