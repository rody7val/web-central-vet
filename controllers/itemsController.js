const Item = require('../models/item_model')
const categories = require('../controllers/categoriesController')
const mp = require('mercadopago')

// Autoload - factoriza el código si la ruta incluye :itemId
exports.load = (req, res, next, itemId) => {
  Item
  .findOne({ _id: itemId })
  .populate('category')
  .populate('tag')
  .exec((err, item) => {
    if (item){
      req.item = item
      return next()
    }
    next(new Error('No existe itemId = '+ itemId))
  })
}

exports.getAll = (filter, cb) => {
  Item
    .find(filter)
    .sort('-created')
    .exec((err, items) => {
      if (err) {
        return cb(new Error("No hay items."))
      }
      cb(null, items)
  })
}

exports.all = (req, res) => {
  Item
  .find()
  .populate('category')
  .sort('-created')
  .exec((err, items) => {
    if (err) {
      return res.json({success: false, err: err})
    }
    res.json({success: true, items: items})
  })
}

exports.add = (req, res) => {
  let item = new Item(req.body.item)

  item.save(err => {
    if (err) {
      return res.json({success: false, err: err})
    }

    categories.setItemRelation(item, (err, success) => {
      if (err) {
        return res.json({success: false, err: err})
      }

      res.json({success: success})
    })
  })
}

exports.delete = (req, res, next) => {
  Item.findOne({
    _id: req.item._id
  }).remove().exec(err => {
    if (err) {
      return res.json({success: false, err: err})
    }
    res.json({success: true})
  })
}

exports.search = (req, res) => {
  let filterItems = {}
  // category
  if (req.body.item && req.body.item.category) {
    filterItems.category = req.body.item.category
  }
  // tag
  if (req.body.item && req.body.item.tag) {
    filterItems.tag = req.body.item.tag
  }
  // title
  if (req.body.item && req.body.item.title) {
    filterItems.title = new RegExp(req.body.item.title, "gi")
  }

  Item
  .find(filterItems)
  .populate("category")
  .populate("tag")
  .sort('-created')
  .exec((err, items) => {
    if (err) {
      return res.json({success: false, err: err})
    }

    if (filterItems && filterItems.title) {
      filterItems.title = req.body.item.title 
    }

    res.json({
      success: true,
      items: items,
      filters: filterItems
    })
  })
}

exports.edit = (req, res, next) => {
  Item.
  findOne({_id: req.item._id}).
  populate("category").
  exec((err, item) => {
    if (err) {
      return res.json({success: false, err: err})
    }
    item.category = req.body.category
    item.img = req.body.img
    item.title = req.body.title
    item.desc = req.body.desc
    item.price = Number(req.body.price)
    item.qty = Number(req.body.qty)
    item.tag = req.body.tag
    item.save()
    res.json({success: true})
  })
}