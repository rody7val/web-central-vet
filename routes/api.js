// Controllers
const categories = require('../controllers/categoriesController')
const tags = require('../controllers/tagsController')
const items = require('../controllers/itemsController')
const auth = require('../controllers/authController')
const mp = require('../controllers/mpController')

module.exports = express => {
  // Router Engines
  const router = express.Router()

  // load
  router.param('categoryId', categories.load)
  router.param('tagId', tags.load)
  router.param('itemId', items.load)

  // categories
  router.get('/categories', categories.all)
  router.post('/categories', categories.add)
  router.post('/categories/:categoryId/delete', categories.delete);
  router.post('/categories/:categoryId/edit', categories.edit);

  // tags
  router.get('/tags', tags.all)
  router.post('/tags', tags.add)
  router.post('/tags/:tagId/delete', tags.delete);
  router.post('/tags/:tagId/edit', tags.edit);

  // items
  router.get('/items', items.all)
  router.post('/items', items.add)
  router.post('/items/search', items.search)
  router.get('/items/:itemId', items.one);
  router.post('/items/:itemId/delete', items.delete);
  router.post('/items/:itemId/edit', items.edit);

  // checkout
  router.post('/checkout', mp.create)

  // auth
  router.post('/auth', auth.signIn)
  router.post('/auth/out', auth.signOut)

  return router
}