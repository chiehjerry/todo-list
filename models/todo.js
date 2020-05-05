//載入 mongoose
const mongoose = require('mongoose')
//mongoose.Schema模組
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 必填單位
  }
})

module.exports = mongoose.model('Todo', todoSchema)