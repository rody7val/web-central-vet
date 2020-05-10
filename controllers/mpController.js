const mp = require('mercadopago')

exports.create = (req, res) => {
  let preference = { items: req.body.items }

  mp.preferences.create(preference).then(response => {
    res.json({
      success: true,
      init_point: response.body.init_point
    })
  }).catch(error => {
    res.json({
      success: false,
      error: error
    })
  })
}