const Item = require('../models/item_model')
const mp = require('mercadopago')

// Autoload - factoriza el código si la ruta incluye :itemId
exports.load = (req, res, next, itemId) => {
	Item.findOne({ _id: itemId })
	.exec((err, item) => {
		if (item){
			req.item = item
			return next()
		}
		next(new Error('No existe itemId = '+ itemId))
	})
}

exports.all = (req, res) => {
  Item
  .find()
  .sort('-created')
  .exec((err, items) => {
    if (err) {
      return res.json({success: false, err: err})
    }
    res.json({success: true, data: items})
  })
}

exports.add = (req, res) => {
  let preference = { items: [{
      title: req.body.item.title,
      quantity: 1,
      currency_id: 'ARS',
      unit_price: req.body.item.price
    }]
  }
  mp.preferences.create(preference).then(data => {
    let itemRequest = req.body.item
    itemRequest.init_point = data.body.init_point
    let item = new Item(itemRequest)

    item.save(err => {
      if (err) {
        return res.json({success: false, err: err})
      }
      res.json({success: true})
    })
  }).catch(error => {
    res.json({
      success: false,
      error: error
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
