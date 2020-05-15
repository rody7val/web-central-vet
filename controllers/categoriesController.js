const Category = require('../models/category_model')

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

