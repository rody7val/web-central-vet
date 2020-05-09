const mongoose = require('mongoose')
const Float = require('mongoose-float').loadType(mongoose, 2)
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  title: String,
  desc: String,
  price: Float,
  qty: Number,
  init_point: String,
  created: {type: Number, default: Date.now}
})

module.exports = mongoose.model('Item', ItemSchema)
