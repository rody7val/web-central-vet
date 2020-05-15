const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: String,
  items: [{type: Schema.Types.ObjectId, ref: 'Item' }]
})

module.exports = mongoose.model('Category', CategorySchema)
