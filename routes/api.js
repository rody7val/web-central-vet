// Controllers
const mpController = require('../controllers/mpController')

module.exports = function (express) {
  // Router Engines
  const router = express.Router()

  router.post('/create/preference', mpController.create)

  return router
}