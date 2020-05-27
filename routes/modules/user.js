// Loading Express and  Express router
const express = require('express')
const router = express.Router()
// Loading passport
const passport = require('passport')
// Loading bcryptjs library
const bcrypt = require('bcryptjs')
// Loading User model
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

  // Add the errors messages
  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填' })
  }

  if (password !== password2) {
    errors.push({ message: '密碼輸入錯誤' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        // Add the message.
        errors.push({ message: '這個 Email 已經註冊過了' })
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        })
      } else {
        const newUser = new User({
          name,
          email,
          password
        })
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash

            newUser
              .save()
              .then(user => {
                res.redirect('/')
              })
              .catch(err => console.log(err))
          })
        )
      }
    })
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  //Add the message.
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})

module.exports = router