const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('index')
})

router.put('/login', (req, res) => {
  res.render('index')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.put('/register', (req, res) => {
  res.render('register')
})

router.get('/logout', (req, res) => {
  res.render('logout')
})

module.exports = router