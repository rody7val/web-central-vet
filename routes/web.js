// Controllers
const web = require('../controllers/webController')
const items = require('../controllers/itemsController')
const categories = require('../controllers/categoriesController')

module.exports = express => {
  // Router Engines
  const router = express.Router()

  // loads
  router.param('itemId', items.load)
  router.param('categoryId', categories.load)
  // home
  router.get('/', web.home)
  // items
  router.get('/items', web.items)
  router.get('/items/:itemId', web.viewItem)
  router.get('/items/:itemId/edit', web.editItem)
  // categoy
  router.get('/categories/:categoryId/edit', web.editCategory)
  return router
}