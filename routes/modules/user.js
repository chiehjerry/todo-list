const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs') // 載入 bcryptjs library
const User = require('../../models/user')


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
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash

          newUser.save()
            .then(user => { res.redirect('/') })
            .catch(err => console.log(err))
        })
      })
    }
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router