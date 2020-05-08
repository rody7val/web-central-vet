const mp = require('mercadopago')

exports.create = (req, res, next) => {
  let preference = { items: req.body.items }

  mp.preferences.create(preference).then(data => {
    res.json({
      success: true,
      data: data.body.init_point
    })
  }).catch(error => {
    res.json({
      success: true,
      data: data.body.init_point
    })
  })
}