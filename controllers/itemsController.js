const Item = require('../models/item_model')
const categories = require('../controllers/categoriesController')
const mp = require('mercadopago')

// Autoload - factoriza el código si la ruta incluye :itemId
exports.load = (req, res, next, itemId) => {
  Item
  .findOne({ _id: itemId })
  .populate('category')
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
  let filter = new RegExp(req.body.filter_title, "gi")
  Item
  .find({
    title: filter
  })
  .populate('category')
  .sort('-created')
  .exec((err, items) => {
    if (err) {
      return res.json({success: false, err: err})
    }
    res.json({
      success: true,
      items: items
    })
  })
}
