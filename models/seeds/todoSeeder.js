// Loading todo model
const Todo = require('../todo')
// Loading 'mongoose' in config  
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' + i })
  }
  console.log('done')
})