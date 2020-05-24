const Tag = require('../models/tag_model')

exports.setItemRelation = (item, cb) => {
  Tag.
  findOne({_id: item.tag}).
  exec((err, tag) => {
    if (err) {
      return cb(new Error(err))
    }
    tag.items.push({_id: item.id })
    tag.save()
    cb(null, true)
  })
}

exports.getAll = (cb) => {
  Tag
    .find()
    .populate("category")
    .sort('created')
    .exec((err, tag) => {
      if (err) {
        return cb(new Error("No hay marcas."))
      }
      cb(null, tag)
  })
}

// Autoload - factoriza el código si la ruta incluye :tagId
exports.load = (req, res, next, tagId) => {
  Tag.findOne({ _id: tagId })
  .exec((err, tag) => {
    if (tag){
      req.tag = tag
      return next()
    }
    next(new Error('No existe tagId = '+ tagId))
  })
}

exports.all = (req, res) => {
  Tag
  .find()
  .sort('-created')
  .exec((err, tags) => {
    if (err) {
      return res.json({success: false, err: err})
    }
    res.json({success: true, tags: tags})
  })
}

exports.add = (req, res) => {
  let tag = new Tag(req.body.tag)

  tag.save(err => {
    if (err) {
      return res.json({success: false, err: err})
    }
    res.json({success: true})
  })
}

exports.delete = (req, res, next) => {
  Tag.findOne({
    _id: req.tag._id
  }).remove().exec(err => {
    if (err) {
      return res.json({success: false, err: err})
    }
    res.json({success: true})
  })
}

exports.edit = (req, res, next) => {
  Tag.
  findOne({_id: req.tag._id}).
  populate("items").
  exec((err, tag) => {
    if (err) {
      return res.json({success: false, err: err})
    }
    tag.name = req.body.name
    tag.img = req.body.img
    tag.save()
    res.json({success: true})
  })
}