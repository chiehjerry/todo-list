// Loading Express and  Express router
const express = require('express')
const router = express.Router()
// Loading Todo model
const Todo = require('../../models/todo')
const { authenticated } = require('../../config/auth')

router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})
router.post('/', authenticated, (req, res) => {
  const name = req.body.name
  const userId = req.user._id
  return Todo.create({ name, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
router.get('/:id', authenticated, (req, res) => {
  return Todo.findOne({ _id: req.params.id, userId: req.user._id })
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})
router.get('/:id/edit', authenticated, (req, res) => {
  return Todo.findOne({ _id: req.params.id, userId: req.user._id })
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})
router.put('/:id', authenticated, (req, res) => {
  const { name, isDone } = req.body
  return Todo.findOne({ _id: req.params.id, userId: req.user._id })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})
router.delete('/:id', authenticated, (req, res) => {
  return Todo.findOne({ _id: req.params.id, userId: req.user._id })
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
module.exports = router