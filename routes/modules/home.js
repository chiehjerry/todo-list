// Loading Express and  Express router
const express = require('express')
const router = express.Router()
// Loading Todo model
const Todo = require('../../models/todo')
// Loading authenticated in auth middleware 
const { authenticated } = require('../../config/auth')


// Setting route of '/' page 
router.get('/', authenticated, (req, res) => {
  Todo.find({ userId: req.user._id }) // Get the user data in Todo model 
    .lean() // Transform Model in Mongoose to a clear JavaScript array 
    .sort({ _id: 'asc' }) // desc
    .then(todos => res.render('index', { todos })) // The data send to index template
    .catch(error => console.error(error)) // Error handling
})


// Export router
module.exports = router