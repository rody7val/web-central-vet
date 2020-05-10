const mp = require('mercadopago')

exports.create = (req, res, next) => {
  let preference = { items: req.body.items }

  mp.preferences.create(preference).then(response => {
    if (response) {
      req.init_point = response.body.init_point
      return next()
    }
    res.json({success: false, err: "MP err"})
  }).catch(error => {
    res.json({success: false, err: "error"})
  })
}