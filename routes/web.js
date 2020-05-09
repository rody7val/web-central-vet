// Controllers
const web = require('../controllers/webController')

module.exports = express => {
  // Router Engines
  const router = express.Router()

  router.get('/', web.home)
  router.get('/items', web.items)

  return router
}