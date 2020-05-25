// models
const Category = require('../models/category_model')
const Item = require('../models/item_model')
// controllers
const Categories = require('./categoriesController')
const Items = require('./itemsController')

// home
exports.home = (req, res) => {
  res.render('index')
}


// items
exports.items = (req, res, next) => {
  let filterItems = {}
  
  // category
  if (req.query && req.query.category) {
    filterItems.category = req.query.category
  }
  // tag
  if (req.query && req.query.tag) {
    filterItems.tag = req.query.tag
  }
  // title
  if (req.query && req.query.title) {
    filterItems.title = new RegExp(req.query.title, "gi")
  }

  Items.getAll(filterItems, (err, items) => {
    res.render('items', { items })
  })
}

exports.viewItem = (req, res) => {
  res.render('items/viewItem', {
    item: req.item
  })
}

exports.editItem = (req, res) => {
  res.render('items/editItem', {
    item: req.item
  })
}


// categories
exports.editCategory = (req, res) => {
  res.render('categories/editCategory', {
    category: req.category
  })
}


// tags
exports.editTag = (req, res) => {
  res.render('tags/editTag', {
    tag: req.tag
  })
}


// services
exports.clinic = (req, res) => {
  res.render('services/clinic')
}

exports.surgery = (req, res) => {
  res.render('services/surgery')
}

exports.vaccination = (req, res) => {
  res.render('services/vaccination')
}
