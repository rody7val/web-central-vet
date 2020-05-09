const Item = require('../models/item_model')
const mp = require('mercadopago')

exports.all = (req, res) => {
  Item
  .find()
  .sort('-created')
  .exec((err, items) => {
    if (err) {
      res.json({success: false, err: err})
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