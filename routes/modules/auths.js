// Loading Express and  Express router
const express = require('express')
const router = express.Router()
// Loading passport
const passport = require('passport')

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
)
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)
module.exports = router