exports.home = (req, res) => {
  res.render('index')
}

exports.items = (req, res) => {
  res.render('items')
}

exports.viewItem = (req, res) => {
  res.render('items/viewItem', {
    item: req.item
  })
}