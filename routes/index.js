// Loading Express and  Express router
const express = require('express')
const router = express.Router()

// Loading the route modules
// Loading home module
const home = require('./modules/home')
// Loading todos module
const todos = require('./modules/todos')
// Loading users module
const user = require('./modules/user')
// Loading auths module
const auths = require('./modules/auths')


// The request of wed addres '/' to home module
router.use('/', home)
// The request of wed addres '/todos' to todos module
router.use('/todos', todos)
// The request of wed addres '/users' to users module
router.use('/users', user)
// The request of wed addres '/auth' to auths module
router.use('/auth', auths)



// Export router
module.exports = router