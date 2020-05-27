// Loading express 
const express = require('express')
// Loading express-handlebars
const exphbs = require('express-handlebars')
// Loading body-parser
const bodyParser = require('body-parser')
// Loading method-override
const methodOverride = require('method-override')
// Loading express-session
const session = require('express-session')
// Loading passport
const passport = require('passport')
// Loading connect-flash
const flash = require('connect-flash')
// Loading routes， /routes will get 'index' automatically 
const routes = require('./routes')
// Loading 'mongoose' in config  
require('./config/mongoose')


const app = express()
// Check the Developnemt mode or Production mode 
if (process.env.NODE_ENV !== 'production') {      // if not production mode
  require('dotenv').config()                      // Use dotenv to load the .env file
}
// Use process.env.PORT if the environment is in heroku
// Use 3000 if the environment is localhost
const PORT = process.env.PORT || 3000

// In 'app.engine' , add a 'hbs' template engine and set a {extname: '.hbs'} to set filename extension , and then the .handlebars can be .hbs
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
// In 'app.set', the 'hbs' component be loaded to app.js to start! 
app.set('view engine', 'hbs')

// Use app.use after using bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
// Set 'request' after methodOverride
app.use(methodOverride('_method'))
// Use app.use to load the middleware, and to use session(option) to set 
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
}))

// Use Connect flash
app.use(flash())


// Use Passport 
app.use(passport.initialize())
app.use(passport.session())
// Load Passport config
require('./config/passport')(passport)

// Get the user information to use the informatin in view 
app.use((req, res, next) => {
  res.locals.user = req.user
  // Check the user login or not 
  res.locals.isAuthenticated = req.isAuthenticated()
  // Add the two flash message variable 
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// Use routes 
app.use(routes)


// Setting port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})