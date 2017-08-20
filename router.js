const { Todo } = require('./model')

const router = require('express').Router({
  caseSensitive: true
})

router.param('id', function (req, res, next, id) {
  req.params.id = parseInt(id)

  next()
})

router.route('/')
  .get(function (req, res, next) {
    Todo.findAll().then(function (todos) {
      res.status(200).send(todos)
      next()
    })
  })
  .post(function (req, res, next) {
    const { body } = req

    Todo.create(body).then(function (todo) {
      res.sendStatus(201)
      next()
    }).catch(function () {
      res.sendStatus(500)
    })
  })

router.route('/:id')
  .get(function (req, res, next) {
    const { id } = req.params

    Todo.findById(id).then(function (todo) {
      if (!todo) {
        res.sendStatus(404)
      } else {
        res.status(200).send(todo)
      }

      next()
    })
  })
  .put(function (req, res, next) {
    const { id } = req.params
    const { body } = req

    Todo.update(body, { where: { id } }).then(function () {
      res.sendStatus(200)
      next()
    })
  })
  .delete(function (req, res, next) {
    const { id } = req.params

    Todo.findById(id).then(function (todo) {
      todo.destroy().then(function () {
        res.sendStatus(200)
        next()
      })
    })
  })

module.exports = router
