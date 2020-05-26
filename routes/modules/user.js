const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { // Use passport authenticate
    successRedirect: '/',   // If login successfully , go to '/' page
    failureRedirect: '/users/login' // If login funsuccessfully, go to '/users/login' page
  })(req, res, next)
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ email: email }).then(user => {
    if (user) { // Check the user exist or not 
      console.log('User already exists')
      res.render('register', {    //The user has registered
        name,
        email,
        password,
        password2
      })
    } else {
      const newUser = new User({    // The usr don't exist ,and then add it
        name,
        email,
        password
      })
      newUser
        .save()
        .then(user => {
          res.redirect('/')  // After adding it , and then go back to the '/' page
        })
        .catch(err => console.log(err))
    }
  })
})

router.get('/logout', (req, res) => {
  res.render('logout')
})

module.exports = router