// Controllers
const web = require('../controllers/webController')
const items = require('../controllers/itemsController')
const categories = require('../controllers/categoriesController')
const tags = require('../controllers/tagsController')

module.exports = express => {
  // Router Engines
  const router = express.Router()

  // loads
  router.param('itemId', items.load)
  router.param('categoryId', categories.load)
  router.param('tagId', tags.load)
  // home
  router.get('/', web.home)
  // items
  router.get('/items', web.items)
  router.get('/items/:itemId', web.viewItem)
  router.get('/items/:itemId/edit', web.editItem)
  // categories
  router.get('/categories/:categoryId/edit', web.editCategory)
  // tags
  router.get('/tags/:tagId/edit', web.editTag)
  return router
}