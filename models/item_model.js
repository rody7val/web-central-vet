const mongoose = require('mongoose')
const Float = require('mongoose-float').loadType(mongoose, 2)
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  tag: { type: Schema.Types.ObjectId, ref: 'Tag' },
  img: String,
  title: String,
  desc: String,
  price: Float,
  qty: Number,
  created: {type: Number, default: Date.now}
})

module.exports = mongoose.model('Item', ItemSchema)
