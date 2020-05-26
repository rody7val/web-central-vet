const Category = require('../models/category_model')

exports.setItemRelation = (item, cb) => {
  Category.
  findOne({_id: item.category}).
  exec((err, category) => {
    if (err) {
      return cb(new Error(err))
    }
    category.items.push({_id: item.id })
    category.save()
    cb(null, true)
  })
}

exports.setTagRelation = (tag, cb) => {
  Category.
  findOne({_id: tag.category}).
  exec((err, category) => {
    if (err) {
      return cb(new Error(err))
    }
    category.tags.push({_id: tag.id })
    category.save()
    cb(null, true)
  })
}

exports.getAll = (cb) => {
  Category
    .find()
    .populate("items")
    .sort('created')
    .exec((err, categories) => {
      if (err) {
        return cb(new Error("No hay categorias."))
      }
      cb(null, categories)
  })
}

// Autoload - factoriza el código si la ruta incluye :categoryId
exports.load = (req, res, next, categoryId) => {
  Category.findOne({ _id: categoryId })
  .exec((err, category) => {
    if (category){
      req.category = category
      return next()
    }
    next(new Error('No existe categoryId = '+ categoryId))
  })
}

exports.all = (req, res) => {
  Category
  .find()
  .sort('-created')
  .exec((err, categories) => {
    if (err) {
      return res.json({success: false, err: err})
    }
    res.json({success: true, categories: categories})
  })
}

exports.add = (req, res) => {
  let category = new Category(req.body.category)

  category.save(err => {
    if (err) {
      return res.json({success: false, err: err})
    }
    res.json({success: true})
  })
}

exports.delete = (req, res, next) => {
  Category.findOne({
    _id: req.category._id
  }).remove().exec(err => {
    if (err) {
      return res.json({success: false, err: err})
    }
    res.json({success: true})
  })
}

exports.edit = (req, res, next) => {
  Category.
  findOne({_id: req.category._id}).
  populate("items").
  exec((err, category) => {
    if (err) {
      return res.json({success: false, err: err})
    }
    category.name = req.body.name
    category.img = req.body.img
    category.save()
    res.json({success: true})
  })
}