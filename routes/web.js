// Controllers
const web = require('../controllers/webController')
const items = require('../controllers/itemsController')

module.exports = express => {
  // Router Engines
  const router = express.Router()

  // load
  router.param('itemId', items.load)
  // items
  router.get('/', web.home)
  router.get('/items', web.items)
  router.get('/items/:itemId', web.viewItem)
  //notices
  router.get('/notices', web.notices)
  router.get('/notices/:noticeId', web.viewNotice)

  return router
}