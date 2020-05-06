
// 載入 todo model
const Todo = require('../todo')
// // 引入config中的mongoose，並且
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' + i })
  }
  console.log('done')
})