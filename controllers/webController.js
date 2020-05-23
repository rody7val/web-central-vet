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

  Categories.getAll((errC, categories) => {
    filterItems.category = req.query && req.query.category ? req.query.category : null

    Items.getAll(filterItems, (errI, items) => {
      res.render('items', { items, categories })
    })
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
