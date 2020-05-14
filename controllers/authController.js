exports.signIn = (req, res, next) => {
  if (!req.body.user) {
  	return res.json({success: false})
  }
  console.log(req.body.user)
  req.session.user = req.body.user
  res.json({success: true})
}

exports.signOut = (req, res, next) => {
  if (!req.body.signOut) {
  	return res.json({success: false})
  }
  delete req.session.user
  res.json({success: true})
}