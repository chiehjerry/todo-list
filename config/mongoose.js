// Loading mongoose
const mongoose = require('mongoose')

// Use process.env.MONGODB_URI in Heroku 
// Use mongodb://localhost/todo-list in localhost
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo-list'

// Loading mongoose , and set connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db