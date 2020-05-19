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

exports.notices = (req, res) => {
  res.render('notices')
}

exports.viewNotice = (req, res) => {
  res.render('notices/viewNotice', {
    item: req.item
  })
}