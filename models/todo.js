// Loading mongoose
const mongoose = require('mongoose')
// mongoose.Schema
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name: {
    type: String, // the type is String
    required: true // required
  },
  isDone: {
    type: Boolean,
    default: false,  // Default completion status is false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Todo', todoSchema)