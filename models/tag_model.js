const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema({
  category: {type: Schema.Types.ObjectId, ref: 'Category' },
  img: String,
  name: String,
  items: [{type: Schema.Types.ObjectId, ref: 'Item' }]
})

module.exports = mongoose.model('Tag', TagSchema)
