const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: String,
  img: String,
  items: [{type: Schema.Types.ObjectId, ref: 'Item' }],
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag' }]
})

module.exports = mongoose.model('Category', CategorySchema)
